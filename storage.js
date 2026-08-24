export function simpanTugas(daftarTugas) {
    localStorage.setItem(
        "daftarTugas",
        JSON.stringify(daftarTugas)
    );
}

export function muatTugas() {
    const data = localStorage.getItem("daftarTugas");

    if (data) {
        return JSON.parse(data);
    }

    return [
        { id: 1, nama: "Belajar JavaScript",selesai: false,coret: false},
        { id: 2, nama: "Olahraga pagi", selesai: false,coret: false}
    ];
}

export function simpanCatatan(daftarCatatan) {
    localStorage.setItem(
        "daftarCatatan",
        JSON.stringify(daftarCatatan)
    );
}

export function muatCatatan() {
    const data = localStorage.getItem("daftarCatatan");

    if (data) {
        return JSON.parse(data);
    }

    return [];
}

export function simpanTema(tema) {
    localStorage.setItem("tema", tema);
}

export function muatTema() {
    return localStorage.getItem("tema") || "terang";
}