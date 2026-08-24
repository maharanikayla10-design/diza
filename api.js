const kutipanCadangan = [
    {content: "Tidak harus hebat untuk memulai, tetapi harus memulai untuk menjadi hebat.",
        author: "Zig Ziglar"},
    {content: "Belajar sedikit setiap hari akan membawa perubahan besar.",
        author: "DailyBoard"},
    {content: "Jangan takut salah, karena kesalahan adalah bagian dari belajar.",
        author: "DailyBoard"},
    {content: "Langkah kecil hari ini adalah kemajuan untuk hari esok.",
        author: "DailyBoard"},
    {content: "Tetap mencoba, tetap belajar, dan jangan mudah menyerah.",
        author: "DailyBoard"}
];

export async function ambilKutipan() {
    try {
        const res = await fetch(
            "https://api.quotable.io/random"
        );

        if (!res.ok) {
            throw new Error("Gagal memuat kutipan");
        }

        const data = await res.json();

        return `"${data.content}" — ${data.author}`;

    } catch (error) {

        const acak =
            kutipanCadangan[
                Math.floor(
                    Math.random() * kutipanCadangan.length
                )
            ];

        return `"${acak.content}" — ${acak.author}`;
    }
}

export async function ambilCuaca(kota) {
    const apiKey = "4d602bbd1bd08e46323efd5b2ccc8acf";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(kota)}&appid=${apiKey}&units=metric&lang=id`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Kota tidak ditemukan");
        }

        const data = await res.json();

        return {
            berhasil: true,
            nama: data.name,
            suhu: Math.round(data.main.temp),
            terasa: Math.round(data.main.feels_like),
            kelembapan: data.main.humidity,
            angin: data.wind.speed,
            deskripsi: data.weather[0].description
        };

    } catch (error) {

        return {
            berhasil: false,
            pesan: error.message
        };
    }
}