# Benang Digital — Website Sambutan Kreator

Website statis untuk menyambut kreator TikTok yang baru gabung ke Benang
Digital, sekaligus tempat modul belajar singkat. Dibangun pakai HTML, CSS,
dan JavaScript biasa — tidak perlu build step, jadi siap langsung dihosting
di GitHub Pages.

## Struktur folder

```
index.html          Halaman utama (semua teks/konten ada di sini)
css/style.css        Semua styling & animasi
js/main.js           Data modul belajar, FAQ, dan interaksi
assets/               Logo & favicon
```

## Cara ganti isi

**Video modul belajar** — buka `js/main.js`, cari array `MODULES` di bagian
paling atas. Setiap baris = satu modul. Ganti `id` dengan ID video YouTube-nya
(bagian setelah `v=` di URL, atau setelah `youtu.be/`):

```js
{ id: 'ID_VIDEO_DI_SINI', title: 'Judul modul', desc: 'Deskripsi singkat.' },
```

**Pertanyaan FAQ** — di file yang sama, cari array `FAQS` dan edit `q`
(pertanyaan) / `a` (jawaban) sesukanya.

**Kontak & link WhatsApp** — buka `index.html`, cari bagian `id="kontak"` di
paling bawah. Ganti nomor WhatsApp di `href="https://wa.me/62..."`, akun
Instagram, dan alamat email.

**Teks lain** (headline hero, tentang kami, dll) — semuanya teks biasa di
`index.html`, tinggal cari dan ganti.

## Cara publish ke GitHub Pages

1. Buat repository baru di GitHub, lalu push semua isi folder ini ke branch
   `main`:
   ```bash
   git init
   git add .
   git commit -m "Setup website Benang Digital"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
2. Di GitHub, buka **Settings → Pages**.
3. Di bagian **Build and deployment**, pilih source **Deploy from a branch**,
   branch `main`, folder `/ (root)`. Klik **Save**.
3. Setelah beberapa menit, situs akan aktif di
   `https://USERNAME.github.io/NAMA-REPO/`.

Setiap kali ada perubahan, tinggal `git add .`, `git commit`, `git push` —
GitHub Pages otomatis update.

## Yang perlu dicek sebelum publish

- [ ] Semua ID video di `js/main.js` sudah diganti dengan video asli
- [ ] Nomor WhatsApp, Instagram, dan email di `index.html` sudah benar
- [ ] Teks di bagian "Tentang Kami" sudah dicek ulang biar sesuai kondisi
      tim saat ini
