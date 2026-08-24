export function tambahCatatan(daftar, isi) {
    return [
        ...daftar,
        {
            id: Date.now(),
            isi: isi,
            tanggal: new Date().toLocaleString("id-ID")
        }
    ];
}

export function hapusCatatan(daftar, id) {
    return daftar.filter(function (catatan) {
        return catatan.id !== id;
    });
}

export function editCatatan(daftar, id, isiBaru) {
    return daftar.map(function (catatan) {
        if (catatan.id === id) {
            return {
                ...catatan,
                isi: isiBaru
            };
        }

        return catatan;
    });
}