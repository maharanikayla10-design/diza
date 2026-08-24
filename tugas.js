export function tambahTugas(daftar, nama) {
    return [
        ...daftar,
        { id: Date.now(),nama: nama,selesai: false,coret: false}
    ];
}

export function hapusTugas(daftar, id) {
    return daftar.filter(function (tugas) {
        return tugas.id !== id;
    });
}

export function toggleSelesai(daftar, id) {
    return daftar.map(function (tugas) {
        if (tugas.id === id) {
            return {
                ...tugas,
                selesai: !tugas.selesai
            };
        }

        return tugas;
    });
}

export function editTugas(daftar, id, namaBaru) {
    return daftar.map(function (tugas) {
        if (tugas.id === id) {
            return {
                ...tugas,
                nama: namaBaru
            };
        }

        return tugas;
    });
}

export function toggleCoret(daftar, id) {
    return daftar.map(function (tugas) {
        if (tugas.id === id) {
            return {
                ...tugas,
                coret: !tugas.coret
            };
        }

        return tugas;
    });
}

export function filterTugas(daftar, filterAktif, kataKunci) {
    return daftar.filter(function (tugas) {

        if (filterAktif === "selesai" && !tugas.selesai) {
            return false;
        }

        if (filterAktif === "belum" && tugas.selesai) {
            return false;
        }

        if (
            kataKunci &&
            !tugas.nama.toLowerCase().includes(kataKunci.toLowerCase())
        ) {
            return false;
        }

        return true;
    });
}