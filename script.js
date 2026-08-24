const app = document.getElementById("app");
const statusElement = document.getElementById("status");

const kolomKiri = document.createElement("div");
kolomKiri.className = "kolom kolom-kiri";

const kolomKanan = document.createElement("div");
kolomKanan.className = "kolom kolom-kanan";

app.appendChild(kolomKiri);
app.appendChild(kolomKanan);

const sectionTugas = document.createElement("section");
const sectionCatatan = document.createElement("section");
const sectionKutipan = document.createElement("section");
const sectionCuaca = document.createElement("section");

sectionTugas.id = "tugas";
sectionCatatan.id = "catatan";
sectionKutipan.id = "kutipan";
sectionCuaca.id = "cuaca";

kolomKiri.appendChild(sectionTugas);
kolomKiri.appendChild(sectionCatatan);
kolomKanan.appendChild(sectionKutipan);
kolomKanan.appendChild(sectionCuaca);

const judulTugas = document.createElement("h2");
judulTugas.textContent = "Tugas";

const keteranganTugas = document.createElement("p");
keteranganTugas.className = "deskripsi";
keteranganTugas.textContent =
    "Klik teks untuk mencoret. Klik dua kali untuk mengubah. Seret untuk mengubah urutan.";

const judulCatatan = document.createElement("h2");
judulCatatan.textContent = "Catatan";

const judulKutipan = document.createElement("h2");
judulKutipan.textContent = "Kutipan Hari Ini";

const judulCuaca = document.createElement("h2");
judulCuaca.textContent = "Cuaca";

sectionTugas.appendChild(judulTugas);
sectionTugas.appendChild(keteranganTugas);
sectionCatatan.appendChild(judulCatatan);
sectionKutipan.appendChild(judulKutipan);
sectionCuaca.appendChild(judulCuaca);

let daftarTugas = [];
let daftarCatatan = [];

let filterAktif = "semua";
let kataKunciAktif = "";


const formTugas = document.createElement("form");

const inputTugas = document.createElement("input");
inputTugas.type = "text";
inputTugas.placeholder = "Masukkan tugas...";

const tombolTambah = document.createElement("button");
tombolTambah.type = "submit";
tombolTambah.textContent = "Tambah";

formTugas.appendChild(inputTugas);
formTugas.appendChild(tombolTambah);

sectionTugas.appendChild(formTugas);


const daftarTugasElement = document.createElement("ul");
daftarTugasElement.id = "daftar-tugas";

sectionTugas.appendChild(daftarTugasElement);


function renderTugas() {

    daftarTugasElement.innerHTML = "";

    const tugasTersaring = filterTugas(
        daftarTugas,
        filterAktif,
        kataKunciAktif
    );

    tugasTersaring.forEach(function (tugas) {

        const li = document.createElement("li");
        li.className = "tugas-item";
        li.dataset.id = tugas.id;
        li.draggable = true;

        if (tugas.selesai) {
            li.classList.add("selesai");
        }

        const nama = document.createElement("span");
        nama.textContent = tugas.nama;

        if (tugas.coret) {
            nama.classList.add("coret");
        }

        let waktuKlik = null;

        nama.addEventListener("click", function () {

            if (waktuKlik !== null) {
                return;
            }

            waktuKlik = setTimeout(function () {

                daftarTugas = toggleCoret(daftarTugas,tugas.id);

                simpanTugas(daftarTugas);
                renderTugas();

                waktuKlik = null;

            }, 220);
        });

        nama.addEventListener("dblclick", function () {

            clearTimeout(waktuKlik);
            waktuKlik = null;

            const inputEdit = document.createElement("input");

            inputEdit.type = "text";
            inputEdit.value = tugas.nama;

            nama.replaceWith(inputEdit);

            inputEdit.focus();
            inputEdit.select();

            function simpanEdit() {

                if (inputEdit.value.trim() === "") {
                    alert("Tidak boleh kosong!");
                    return;
                }

                daftarTugas = editTugas(daftarTugas,tugas.id,inputEdit.value.trim());

                simpanTugas(daftarTugas);
                renderTugas();
            }

            inputEdit.addEventListener(
                "keypress",
                function (event) {

                    if (event.key === "Enter") {
                        simpanEdit();
                    }
                }
            );

            inputEdit.addEventListener("blur",simpanEdit);
        });

        const tombolSelesaiItem = document.createElement("button");
        tombolSelesaiItem.textContent = tugas.selesai ? "Batal Selesai" : "Selesai";
        tombolSelesaiItem.addEventListener(
            "click",
            function () {

                daftarTugas = toggleSelesai(
                    daftarTugas,
                    tugas.id
                );

                simpanTugas(daftarTugas);
                renderTugas();
            }
        );

        const tombolHapus =document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener(
            "click",
            function () {

                daftarTugas = hapusTugas(
                    daftarTugas,
                    tugas.id
                );

                simpanTugas(daftarTugas);
                renderTugas();
            }
        );

        const aksi =document.createElement("div");
        aksi.className = "aksi-tugas";

        aksi.appendChild(tombolSelesaiItem);
        aksi.appendChild(tombolHapus);

        li.appendChild(nama);
        li.appendChild(aksi);

        daftarTugasElement.appendChild(li);
    });

    aktifkanDragDrop();
}

formTugas.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        if (inputTugas.value.trim() === "") {
            alert("Input tidak boleh kosong!");
            return;
        }

        daftarTugas = tambahTugas(daftarTugas,inputTugas.value.trim());

        simpanTugas(daftarTugas);

        inputTugas.value = "";

        renderTugas();
    }
);

const barisFilter = document.createElement("div");
barisFilter.className = "baris-filter";

const tombolSemua = document.createElement("button");
tombolSemua.textContent = "Semua";

const tombolSelesai = document.createElement("button");
tombolSelesai.textContent = "Selesai";

const tombolBelum =document.createElement("button");
tombolBelum.textContent = "Belum Selesai";

barisFilter.appendChild(tombolSemua);
barisFilter.appendChild(tombolSelesai);
barisFilter.appendChild(tombolBelum);

sectionTugas.appendChild(barisFilter);

tombolSemua.addEventListener(
    "click",
    function () {

        filterAktif = "semua";
        renderTugas();
    }
);

tombolSelesai.addEventListener(
    "click",
    function () {

        filterAktif = "selesai";
        renderTugas();
    }
);

tombolBelum.addEventListener(
    "click",
    function () {

        filterAktif = "belum";
        renderTugas();
    }
);

const formCatatan = document.createElement("form");

const inputCatatan = document.createElement("textarea");

inputCatatan.placeholder = "Tulis catatan cepat...";

const tombolCatatan = document.createElement("button");

tombolCatatan.type = "submit";
tombolCatatan.textContent = "Tambah Catatan";

formCatatan.appendChild(inputCatatan);
formCatatan.appendChild(tombolCatatan);

sectionCatatan.appendChild(formCatatan);

const daftarCatatanElement =document.createElement("div");

sectionCatatan.appendChild(daftarCatatanElement);

function renderCatatan() {

    daftarCatatanElement.innerHTML = "";

    daftarCatatan.forEach(function (catatan) {

        const div =document.createElement("div");

        div.className = "catatan-item";

        const p = document.createElement("p");

        p.textContent = catatan.isi;

        const tanggal =document.createElement("small");

        tanggal.textContent =catatan.tanggal;

        const tombolEdit =document.createElement("button");

        tombolEdit.textContent = "Edit";

        const tombolHapus =document.createElement("button");

        tombolHapus.textContent = "Hapus";


        tombolHapus.addEventListener(
            "click",
            function () {
                daftarCatatan = hapusCatatan(daftarCatatan,catatan.id);

                simpanCatatan(daftarCatatan);
                renderCatatan();
            }
        );

        tombolEdit.addEventListener(
            "click",
            function () {
                const inputEdit =document.createElement("textarea");

                inputEdit.value =catatan.isi;

                p.replaceWith(inputEdit);

                inputEdit.focus();

                const tombolSimpan =document.createElement("button");
                tombolSimpan.textContent ="Simpan";

                const tombolBatal =document.createElement("button");
                tombolBatal.textContent = "Batal";

                tombolEdit.replaceWith(tombolSimpan);
                tombolHapus.before(tombolBatal);

                tombolSimpan.addEventListener(
                    "click",
                    function () {

                        if (
                            inputEdit.value.trim() === ""
                        ) {
                            alert(
                                "Input tidak boleh kosong!"
                            );
                            return;
                        }

                        daftarCatatan = editCatatan(daftarCatatan,catatan.id,inputEdit.value.trim());

                        simpanCatatan(daftarCatatan);
                        renderCatatan();
                    }
                );

                tombolBatal.addEventListener(
                    "click",
                    function () {

                        renderCatatan();
                    }
                );
            }
        );

        div.appendChild(p);
        div.appendChild(tanggal);

        div.appendChild(document.createElement("br"));

        div.appendChild(tombolEdit);
        div.appendChild(tombolHapus);

        daftarCatatanElement.appendChild(div);
    });
}

formCatatan.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        if (inputCatatan.value.trim() === "") {
            alert("Catatan tidak boleh kosong!");
            return;
        }

        daftarCatatan = tambahCatatan(daftarCatatan,inputCatatan.value.trim());
        simpanCatatan(daftarCatatan);

        inputCatatan.value = "";
        renderCatatan();
    }
);

const kutipanElement = document.createElement("p");

kutipanElement.id ="kutipan-harian";

sectionKutipan.appendChild( kutipanElement);

async function tampilkanKutipan() {
    kutipanElement.textContent = "Memuat kutipan...";
    const hasil = await ambilKutipan();
    kutipanElement.textContent =hasil;
}

const cuacaKartu = document.createElement("div");
cuacaKartu.className = "cuaca-kartu";

const cuacaIkon = document.createElement("div");
cuacaIkon.className = "cuaca-ikon";

const cuacaTeks = document.createElement("div");

const cuacaSuhu = document.createElement("div");
cuacaSuhu.className = "cuaca-suhu";

const cuacaDeskripsi = document.createElement("div");
cuacaDeskripsi.className = "cuaca-deskripsi";

cuacaTeks.appendChild(cuacaSuhu);
cuacaTeks.appendChild(cuacaDeskripsi);

cuacaKartu.appendChild(cuacaIkon);
cuacaKartu.appendChild(cuacaTeks);


const cuacaStats = document.createElement("div");
cuacaStats.className = "cuaca-stats";

const statTerasa = document.createElement("div");
const statKelembapan = document.createElement("div");
const statAngin = document.createElement("div");

cuacaStats.appendChild(statTerasa);
cuacaStats.appendChild(statKelembapan);
cuacaStats.appendChild(statAngin);

const inputKota = document.createElement("input");
inputKota.placeholder = "Masukkan nama kota";

inputKota.value = "Jakarta";

const tombolCuaca = document.createElement("button");
tombolCuaca.textContent = "Cek Cuaca";

const cuacaWaktu = document.createElement("div");
cuacaWaktu.className = "cuaca-waktu";

sectionCuaca.appendChild(cuacaKartu);
sectionCuaca.appendChild(cuacaStats);
sectionCuaca.appendChild(inputKota);
sectionCuaca.appendChild(tombolCuaca);
sectionCuaca.appendChild(cuacaWaktu);

async function tampilkanCuaca(kota) {
    cuacaSuhu.textContent = "Memuat...";
    const data = await ambilCuaca(kota);

    if (!data.berhasil) {
        cuacaSuhu.textContent = data.pesan;
        cuacaDeskripsi.textContent ="";

        return;
    }

    cuacaSuhu.textContent = `${data.nama}: ${data.suhu}°C`;
    cuacaDeskripsi.textContent = data.deskripsi;

    statTerasa.textContent = `Terasa ${data.terasa}°C`;
    statKelembapan.textContent =`Kelembapan ${data.kelembapan}%`;
    statAngin.textContent = `Angin ${data.angin} m/s`;

    cuacaWaktu.textContent = "Terakhir diperbarui: " + new Date().toLocaleTimeString("id-ID");
}

tombolCuaca.addEventListener(
    "click",
    function () {
        const kota = inputKota.value.trim();

        if (kota === "") {
            alert("Masukkan nama kota!");
            return;
        }

        tampilkanCuaca(kota);
    }
);

const cariTugas = document.createElement("input");
cariTugas.placeholder = "Cari tugas...";
sectionTugas.appendChild(cariTugas);

cariTugas.addEventListener(
"input",
    function (event) {
        kataKunciAktif = event.target.value.toLowerCase();

        renderTugas();
    }
);

const toggleTema = document.createElement("button");
toggleTema.id = "toggle-tema";

document
    .querySelector("header")
    .appendChild(toggleTema);

function tampilkanNamaTema() {

    if (document.body.classList.contains("dark-mode")) {
        toggleTema.textContent ="Mode Terang";
    } else {
        toggleTema.textContent ="Mode Gelap";
    }
}

toggleTema.addEventListener(
    "click",
    function () {
        document.body.classList.toggle("dark-mode");
        const modeAktif = document.body.classList.contains("dark-mode");

        simpanTema(modeAktif ? "gelap" : "terang");
        tampilkanNamaTema();
    }
);

function aktifkanDragDrop() {
    const items = document.querySelectorAll(".tugas-item");
    items.forEach(function (item) {

        item.addEventListener("dragstart",function (event) {
            
            event.dataTransfer.setData("text/plain",item.dataset.id);
        }
        );

        item.addEventListener(
            "dragover",
            function (event) { event.preventDefault();

                item.classList.add("drag-over");
            }
        );

        item.addEventListener(
            "dragleave",
            function () {
                item.classList.remove("drag-over");
            }
        );

        item.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();
                item.classList.remove("drag-over");

                const idAsal = Number(event.dataTransfer.getData("text/plain"));
                const idTujuan = Number(item.dataset.id);

                if (idAsal === idTujuan) {
                    return;
                }

                const indexAsal = daftarTugas.findIndex(
                        function (tugas) {
                            return tugas.id === idAsal;
                        }
                    );

                const indexTujuan = daftarTugas.findIndex(
                        function (tugas) {
                            return tugas.id === idTujuan;
                        }
                    );

                if (indexAsal === -1 || indexTujuan === -1) {

                    return;
                }

                const tugasDipindah = daftarTugas.splice(indexAsal,1)[0];
                daftarTugas.splice(indexTujuan,0,tugasDipindah);

                simpanTugas(daftarTugas);
                renderTugas();
            }
        );
    });
}

async function muatSemuaWidget() {

    if (statusElement) {
        statusElement.textContent ="Memuat data...";
    }

    await Promise.all([
        tampilkanKutipan(),
        tampilkanCuaca(inputKota.value)
    ]);

    if (statusElement) {
        statusElement.textContent ="Data berhasil di muat";
    }
}

window.addEventListener(
    "DOWcontentLoaded",
    function () {
        daftarTugas = muatTugas();
        daftarCatatan = muatCatatan();

        if (muatTema() === "gelap"){
            document.body.classList.add(
                "dark-more"
            );
        }
        tampilkanNamaTema();
        renderTugas();
        renderCatatan();
        muatSemuaWidget();
    }
);

