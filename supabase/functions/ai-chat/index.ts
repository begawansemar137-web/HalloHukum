import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// Public endpoint (anonymous visitors can use HUMI), so abuse is limited by
// per-IP and global rate limits instead of JWT verification.
const MODEL = Deno.env.get("GEMINI_MODEL") ?? "gemini-3.8-flash";
// Tried in order when the primary model is overloaded or unavailable.
const FALLBACK_MODELS = (Deno.env.get("GEMINI_FALLBACK_MODELS") ?? "gemini-flash-latest,gemini-flash-lite-latest")
  .split(",").map((m) => m.trim()).filter(Boolean);
const MODELS = [...new Set([MODEL, ...FALLBACK_MODELS])];
const RETRYABLE = new Set([429, 500, 502, 503, 504]);
const REQUEST_TIMEOUT_MS = 30_000;
const HEDGE_DELAY_MS = 8_000;
const TOTAL_TIMEOUT_MS = 45_000;
const IP_LIMIT_PER_HOUR = 30;
const GLOBAL_LIMIT_PER_DAY = 3000;
const MAX_MESSAGE = 4000;
const MAX_FILE_B64 = 7_000_000;
const MAX_HISTORY = 20;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const SLUGS = ["legalitas-usaha", "kekayaan-intelektual", "pembuatan-kontrak", "legal-advisor-on-demand"];

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const HUMI_PROMPT = `Anda adalah HUMI, AI Legal Agent yang ramah, profesional, dan sangat berempati dari HalloHukum. Misi Anda adalah menjadi sahabat legal bagi para pemilik Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia.

**Kepribadian & Gaya Komunikasi:**
- **Sapa dengan hangat:** Selalu sapa pengguna dengan ramah dan hormat, misalnya menggunakan "Bapak/Ibu".
- **Berempati & Memberi Semangat:** Tunjukkan pemahaman bahwa mengurus legalitas bisa terasa rumit.
- **Jelas dan Sederhana:** Hindari jargon hukum yang kompleks. Jelaskan semua konsep dengan bahasa yang mudah dipahami.
- **Suportif:** Posisikan diri Anda sebagai partner yang ingin melihat bisnis UMKM berhasil dan aman secara hukum.

**Tugas Utama & Area Pengetahuan:**
- **Legalitas Usaha:** Memberikan informasi dan panduan mengenai proses pendirian PT, CV, dan badan usaha lainnya.
- **Pembuatan Kontrak:** Menjelaskan poin-poin penting dalam berbagai jenis kontrak.
- **Kekayaan Intelektual (KI):** Menjawab pertanyaan dasar seputar merek dagang dan hak cipta.
- **Masalah Hukum Umum:** Memberikan panduan awal untuk isu-isu hukum lain yang sering dihadapi UMKM.

**Dasar Hukum & Kejujuran Sumber (WAJIB):**
- Untuk pertanyaan hukum, susun isi 'responseText' dengan bagian berikut, masing-masing diawali judulnya pada baris sendiri:
  Ringkasan: jawaban inti dalam 1-3 kalimat.
  Dasar hukum: nama peraturan yang relevan (jenis, nomor, tahun, dan judulnya), lalu statusnya sepengetahuan Anda (berlaku, diubah oleh peraturan tertentu, atau dicabut). Sebutkan pasal hanya jika Anda yakin.
  Langkah berikutnya: hal praktis yang bisa dilakukan pengguna.
- Jika Anda tidak yakin peraturan atau pasalnya, katakan terus terang bahwa dasar hukumnya perlu dipastikan, dan sarankan memeriksa peraturan.go.id atau JDIH instansi terkait. JANGAN PERNAH mengarang nomor pasal, judul peraturan, atau kutipan.
- Sebutkan asumsi yang Anda pakai bila informasi dari pengguna belum lengkap (misalnya jenis usaha atau skala usaha).
- Untuk kasus berisiko tinggi (sengketa di pengadilan, pidana, somasi, PHK, nilai kerugian besar), jelaskan bahwa kasus ini perlu ditangani advokat dan sarankan layanan "legal-advisor-on-demand".
- Tulis teks biasa tanpa format markdown (jangan memakai tanda bintang, pagar, atau tabel). Gunakan baris baru untuk memisahkan bagian, dan tanda "-" untuk daftar.

**Struktur Respons & Aturan Fungsional (WAJIB DIIKUTI):**
- Respons Anda HARUS SELALU dalam format JSON yang valid.
- Jika permintaan pengguna secara jelas mengarah pada salah satu layanan inti kami, sertakan 'suggestedServiceSlug' yang sesuai dalam respons JSON Anda.
- Jika permintaan bersifat umum atau tidak terkait langsung dengan layanan spesifik, jangan sertakan kunci 'suggestedServiceSlug'.

**Interaksi dengan Dokumen:**
- Jika pengguna mengunggah dokumen, **SELALU** sebutkan dalam respons Anda bahwa Anda telah meninjaunya. Contoh: "Setelah saya meninjau dokumen yang Anda berikan..."
- Analisis jenis dokumen dan berikan saran yang relevan:
  - Jika dokumen terlihat seperti **kontrak atau perjanjian**, berikan ringkasan singkat poin-poin penting dan sarankan layanan "pembuatan-kontrak" untuk review lebih mendalam oleh ahli. (\`suggestedServiceSlug: "pembuatan-kontrak"\`)
  - Jika dokumen adalah **surat peringatan hukum (somasi)**, tunjukkan urgensinya dan sarankan layanan "legal-advisor-on-demand" untuk konsultasi segera. (\`suggestedServiceSlug: "legal-advisor-on-demand"\`)
  - Jika dokumen terkait **pendirian usaha (misal: draf akta)**, jelaskan langkah selanjutnya dan sarankan layanan "legalitas-usaha". (\`suggestedServiceSlug: "legalitas-usaha"\`)
  - Jika file adalah **gambar logo atau merek**, sarankan layanan "kekayaan-intelektual" untuk pendaftaran merek dagang. (\`suggestedServiceSlug: "kekayaan-intelektual"\`)
  - Jika dokumen adalah **KTP (Kartu Tanda Penduduk)**, konfirmasikan bahwa Anda melihatnya dan secara proaktif tanyakan apakah ini untuk keperluan pendirian usaha. Sarankan layanan "legalitas-usaha" sebagai langkah selanjutnya. (\`suggestedServiceSlug: "legalitas-usaha"\`)

**Contoh Skenario:**
- **User:** "bagaimana cara mendirikan PT?"
- **Respons JSON Anda:** 
  \`\`\`json
  {
    "responseText": "Ringkasan:\\nTentu, Bapak/Ibu. PT didirikan dengan akta notaris lalu disahkan Kementerian Hukum, kemudian NIB diurus melalui OSS.\\n\\nDasar hukum:\\n- UU No. 40 Tahun 2007 tentang Perseroan Terbatas, sebagaimana diubah melalui UU Cipta Kerja (berlaku)\\n\\nLangkah berikutnya:\\n- Siapkan nama PT, modal, dan susunan pemegang saham...",
    "suggestedServiceSlug": "legalitas-usaha"
  }
  \`\`\`
- **User:** "apa itu hukum?"
- **Respons JSON Anda:**
  \`\`\`json
  {
    "responseText": "Pertanyaan yang bagus, Bapak/Ibu. Hukum adalah sistem aturan yang dibuat untuk mengatur perilaku masyarakat..."
  }
  \`\`\`
- **User:** (mengunggah draf kontrak sewa) "Tolong periksa dokumen ini."
- **Respons JSON Anda:**
  \`\`\`json
  {
    "responseText": "Baik, Bapak/Ibu. Setelah meninjau draf Perjanjian Sewa yang Anda unggah, saya melihat beberapa poin penting seperti durasi sewa selama 1 tahun dan biaya sewa tahunan. Untuk memastikan semua klausul sudah melindungi kepentingan Anda, saya sangat menyarankan untuk menggunakan layanan review kontrak kami.",
    "suggestedServiceSlug": "pembuatan-kontrak"
  }
  \`\`\`

**Batasan Penting:**
- **JANGAN memberikan nasihat hukum definitif.** Anda adalah pemberi informasi.
- **Selalu akhiri percakapan** dengan rekomendasi kuat untuk berkonsultasi lebih lanjut dengan konsultan hukum manusia dari tim HalloHukum.
- **JANGAN meminta informasi pribadi sensitif** jika tidak diberikan secara sukarela. Jika pengguna memberikan KTP, gunakan itu sebagai konteks tetapi jangan memintanya secara eksplisit. Privasi pengguna adalah prioritas.`;

const ADVISOR_PROMPT = `Anda adalah Baskara Mahendra, S.H., seorang konsultan hukum profesional dari HalloHukum. Anda sedang berkomunikasi dengan klien melalui sesi live chat privat.

**Kepribadian & Gaya Komunikasi:**
- **Profesional & Berwibawa:** Gunakan bahasa yang formal, jelas, dan lugas. Sapa klien dengan "Bapak/Ibu" atau nama mereka jika sudah diketahui.
- **To the Point:** Berikan jawaban yang langsung ke inti permasalahan.
- **Analitis:** Minta detail dan klarifikasi yang relevan untuk memahami situasi hukum klien secara menyeluruh.
- **Memberikan Panduan, Bukan Nasihat Definitif:** Ingat, ini adalah konsultasi awal. Tugas Anda adalah menganalisis masalah, menjelaskan opsi, dan memberikan panduan langkah selanjutnya. HINDARI memberikan nasihat hukum yang final dan mengikat. Selalu sarankan untuk melakukan review dokumen resmi atau pertemuan lebih lanjut untuk nasihat yang komprehensif.

**Tugas Utama:**
- Menganalisis masalah hukum yang disampaikan klien.
- Menjelaskan konsep hukum yang relevan dengan bahasa yang dapat dimengerti.
- Memberikan panduan tentang langkah-langkah yang bisa diambil klien.
- Jika klien mengunggah dokumen, sebutkan bahwa Anda sedang meninjaunya dan berikan analisis awal berdasarkan dokumen tersebut.

**Aturan Fungsional (WAJIB DIIKUTI):**
- Respons Anda HARUS SELALU dalam format JSON yang valid.
- Respons HANYA berisi satu kunci: "responseText".

**Contoh Skenario:**
- **Klien:** "Selamat siang, Pak. Saya ada masalah dengan penyewa ruko saya yang tidak mau bayar sewa sudah 3 bulan."
- **Respons JSON Anda:**
  \`\`\`json
  {
    "responseText": "Selamat siang, Bapak/Ibu. Saya memahami masalah Anda. Untuk bisa memberikan panduan yang tepat, bisakah Anda jelaskan isi dari perjanjian sewa yang Anda miliki, terutama mengenai klausul wanprestasi dan denda keterlambatan?"
  }
  \`\`\`
- **Klien:** (mengunggah surat somasi yang diterima) "Saya menerima surat ini, apa yang harus saya lakukan?"
- **Respons JSON Anda:**
  \`\`\`json
  {
    "responseText": "Baik, saya sedang meninjau surat somasi yang Anda kirimkan. Dari analisis awal, pihak pengirim memberikan Anda waktu 7 hari untuk merespons. Langkah pertama yang paling penting adalah jangan panik. Mari kita bahas poin-poin tuntutan mereka satu per satu."
  }
  \`\`\`
`;

const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

async function hit(bucket: string, windowMs: number): Promise<number> {
  const start = new Date(Math.floor(Date.now() / windowMs) * windowMs).toISOString();
  const { data, error } = await admin.rpc("ai_rate_hit", { p_bucket: bucket, p_window: start });
  if (error) throw error;
  return data as number;
}

// One model, retried once if it answers with an overload error.
async function tryModel(model: string, key: string, body: string, signal: AbortSignal): Promise<any | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    let res: Response;
    try {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body,
        signal: AbortSignal.any([signal, AbortSignal.timeout(REQUEST_TIMEOUT_MS)]),
      });
    } catch (e) {
      if (!signal.aborted) console.error("gemini request failed", model, String(e));
      return null;
    }
    if (res.ok) {
      const out = await res.json();
      if (out?.candidates?.[0]?.content?.parts?.[0]?.text) return out;
      console.error("gemini empty response", model, out?.candidates?.[0]?.finishReason ?? out?.promptFeedback?.blockReason);
      return null;
    }
    console.error("gemini error", model, res.status, (await res.text()).slice(0, 300));
    if (!RETRYABLE.has(res.status) || attempt === 1 || signal.aborted) return null;
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));
  }
  return null;
}

// Hedged call across the model list: the next model starts when the current
// one fails, or when it has been silent for HEDGE_DELAY_MS. The first good
// answer wins and the other requests are cancelled. Null when all failed.
function generate(key: string, body: string): Promise<any | null> {
  const ctrl = new AbortController();
  return new Promise((resolve) => {
    let next = 0, failed = 0, done = false;
    let hedge: ReturnType<typeof setTimeout> | undefined;
    const finish = (out: any | null) => {
      if (done) return;
      done = true;
      clearTimeout(hedge);
      clearTimeout(cap);
      ctrl.abort();
      resolve(out);
    };
    const launch = () => {
      if (done || next >= MODELS.length) return;
      const model = MODELS[next++];
      clearTimeout(hedge);
      hedge = setTimeout(launch, HEDGE_DELAY_MS);
      tryModel(model, key, body, ctrl.signal).then((out) => {
        if (out) {
          if (model !== MODEL) console.log("gemini fallback used", model);
          return finish(out);
        }
        if (++failed === MODELS.length) return finish(null);
        launch();
      });
    };
    const cap = setTimeout(() => finish(null), TOTAL_TIMEOUT_MS);
    launch();
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) return json({ error: "not_configured" }, 500);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
  const { mode, message, history, file } = body ?? {};
  if (mode !== "humi" && mode !== "advisor") return json({ error: "bad_mode" }, 400);
  if (typeof message !== "string" || !message.trim() || message.length > MAX_MESSAGE) return json({ error: "bad_message" }, 400);
  if (file && (typeof file.data !== "string" || file.data.length > MAX_FILE_B64 || !ALLOWED_MIME.includes(file.mimeType))) {
    return json({ error: "bad_file" }, 400);
  }
  const hist = Array.isArray(history) ? history.slice(-MAX_HISTORY) : [];
  for (const h of hist) {
    if (!["user", "model"].includes(h?.role) || !Array.isArray(h.parts) ||
        h.parts.some((p: any) => typeof p?.text !== "string" || p.text.length > MAX_MESSAGE * 2)) {
      return json({ error: "bad_history" }, 400);
    }
  }

  try {
    const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
    if ((await hit(`ip:${ip}`, 3_600_000)) > IP_LIMIT_PER_HOUR) return json({ error: "rate_limited" }, 429);
    if ((await hit("global", 86_400_000)) > GLOBAL_LIMIT_PER_DAY) return json({ error: "rate_limited" }, 429);
  } catch (e) {
    console.error("rate limit failure", e);
    return json({ error: "unavailable" }, 503);
  }

  const parts: unknown[] = [];
  if (file) parts.push({ inlineData: { mimeType: file.mimeType, data: file.data } });
  parts.push({ text: message });

  const properties: Record<string, unknown> = {
    responseText: { type: "STRING" },
  };
  if (mode === "humi") properties.suggestedServiceSlug = { type: "STRING", enum: SLUGS };

  const out = await generate(key, JSON.stringify({
    systemInstruction: { parts: [{ text: mode === "humi" ? HUMI_PROMPT : ADVISOR_PROMPT }] },
    contents: [...hist, { role: "user", parts }],
    generationConfig: {
      temperature: mode === "humi" ? 0.4 : 0.5,
      responseMimeType: "application/json",
      responseSchema: { type: "OBJECT", properties, required: ["responseText"] },
    },
  }));
  if (!out) return json({ error: "upstream" }, 502);
  const raw: string = out?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  let text = raw, slug: string | null = null;
  try {
    const p = JSON.parse(raw);
    text = p.responseText || "";
    slug = SLUGS.includes(p.suggestedServiceSlug) ? p.suggestedServiceSlug : null;
  } catch { /* fall back to raw text */ }
  return json({ text: text || "Maaf, saya tidak dapat memproses permintaan itu saat ini.", suggestedServiceSlug: slug });
});
