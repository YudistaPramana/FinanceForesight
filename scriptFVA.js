/*
FVA = Future Value Annuity
G = Jumlah uang yang diinginkan
U = Jumlah uang saat ini
P = Jumlah uang yanng diinvestasi berkala
r = tingkat ROI (return on investment)
n = frekuensi pembayaran per tahun
t = jumlah tahun
*/

document.addEventListener("DOMContentLoaded", function () {
    var inputNumber = document.getElementById('FVALabel');
    var saveData = localStorage.getItem('FVALabel') ? JSON.parse(localStorage.getItem('FVALabel')) : [];

    inputNumber.addEventListener('input', function () {
        saveData.push(inputNumber.value);
        localStorage.setItem('FVALabel', JSON.stringify(saveData));
    });
    
    document.getElementById("submitButton").onclick = function () {
        var O = document.getElementById("OTextBox").value;

        let P = document.getElementById("PTextBox").value;
        P = parseCurrency(P);

        let G = document.getElementById("GTextBox").value;
        G = parseCurrency(G);

        let r = document.getElementById("rTextBox").value;
        r = parseFloat(r);

        let n = document.getElementById("nTextBox").value;
        n = parseInt(n);

        let t = document.getElementById("tTextBox").value;
        t = parseInt(t);

        function parseCurrency(currency) {
            const cleanedValue = currency.replace(/[^\d.]+/g, "");
            // Ganti semua tanda titik dengan string kosong agar tidak mempengaruhi format angka
            return parseFloat(cleanedValue.replace(/\./g, ""));
        }
        if (!P || !G || !r || !n || !t) {
            alert("silahkan isi seluruh tabel dalu Sobat!")

        } else {
            if (r === 0) {
                FVA = P * t * n;
                FVA = Math.ceil(FVA);
                if (FVA >= G){
    
                    document.getElementById("FR").innerHTML = "CONGRATS SOB! STRATEGIMU DAPAT DILAKSANAKAN"
                    //FR = FinalResult
                    document.getElementById("FVA").innerHTML = "karena nilai tabunganmu adalah " + formatCurrencyIDR(FVA) + " cukup untuk " + O;
                    document.getElementById("FVA2").innerHTML = ""
                    document.getElementById("Saran").innerHTML = "";
                    document.getElementById("PSaran").innerHTML = "";
                    document.getElementById("nSaran").innerHTML = "";
                    document.getElementById("tSaran").innerHTML = "";
    
                } else {
    
                    document.getElementById("FR").innerHTML = "SORRY SOB! STRATEGIMU BELUM DAPAT DILAKSANAKAN"
                    //FR = FinalResult
                    document.getElementById("FVA").innerHTML = "karena nilai tabunganmu adalah " + formatCurrencyIDR(FVA) ;
    
                    FVA = G - FVA;
                    FVA = Math.ceil(FVA);

                    P = G / t * n;
                    P = Math.ceil(P);
                    
                    document.getElementById("FVA2").innerHTML = "Kamu membutuhkan " + formatCurrencyIDR(FVA) + " lagi untuk dapat " + O;
                    document.getElementById("Saran").innerHTML = "Sob, coba ikuti salah satu saran ini";
                    document.getElementById("PSaran").innerHTML = "1. Tingkatkan nominal tiap menabung menjadi " + formatCurrencyIDR(P);
                    document.getElementById("nSaran").innerHTML = "2. Tingkatkan frekuensi menabungmu dalam setahun ";
                    document.getElementById("tSaran").innerHTML = "3. Perpanjang durasi menaabungmu ";

                }
                
            } else {
                r = r / 100;
                let FVA = (P * (((Math.pow(1 + (r / n), n * t) - 1) / (r / n))));
                FVA = Math.ceil(FVA);
                if (FVA >= G){ //Variabel G adalah nilai yang ingin dicapai oleh pengguna
                    //situasi ini menyatakan jika hasil perhitungan FVA telah mencapai nilai yang diinginkan pengguna
                    document.getElementById("FR").innerHTML = "CONGRATS SOB! STRATEGIMU DAPAT DILAKSANAKAN"
                    //FR = FinalResult
                    document.getElementById("FVA").innerHTML = "karena nilai investasimu adalah " + formatCurrencyIDR(FVA) + " cukup untuk " + O;

                    FVA = G - FVA;
                    FVA = Math.ceil(FVA);

                    document.getElementById("FVA2").innerHTML = "" ;
                    document.getElementById("Saran").innerHTML = "";
                    document.getElementById("PSaran").innerHTML = " ";
                    document.getElementById("nSaran").innerHTML = " ";
                    document.getElementById("tSaran").innerHTML = "";
    
                } else {
    
                    document.getElementById("FR").innerHTML = "SORRY SOB! STRATEGIMU BELUM DAPAT DILAKSANAKAN"
                    //FR = FinalResult
                    document.getElementById("FVA").innerHTML = "Karena nilai investasimu adalah " + formatCurrencyIDR(FVA)
    
                    FVA = G - FVA;
                    FVA = Math.ceil(FVA);
                    
                    document.getElementById("FVA2").innerHTML = "Kamu membutuhkan " + formatCurrencyIDR(FVA) + " lagi untuk dapat " + O;
                    document.getElementById("Saran").innerHTML = "Sob, coba ikuti salah satu saran ini";


                    if(n==12){//tiap bulan
                        P = G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)));
                        P = Math.ceil(P);
                        document.getElementById("PSaran").innerHTML = "1. Tingkatkan nominal tiap investasi menjadi " + formatCurrencyIDR(P) + " atau";
                        while (true) {
                            let P = document.getElementById("PTextBox").value;
                            P = parseCurrency(P);
                            t++;
                            // Blok kode yang akan diulang
                            if (P > G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)))) {
                              break; // Keluar dari loop jika kondisi tertentu terpenuhi
                            }
                        }
                        document.getElementById("nSaran").innerHTML = "2. Perpanjang durasi investasimu menjadi " + t + " tahun.";
                        document.getElementById("tSaran").innerHTML = " ";


                    }else if(n==6){//tiap 2 bulan
                        P = G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)));
                        P = Math.ceil(P);
                        document.getElementById("PSaran").innerHTML = "1. Tingkatkan nominal tiap investasi menjadi " + formatCurrencyIDR(P) + ", atau";

                        P = G / (((Math.pow(1 + (r / 12), 12 * t) - 1) / (r / 12)));
                        P = Math.ceil(P);
                        document.getElementById("nSaran").innerHTML = "2. Investasi tiap bulan dengan nominal " + formatCurrencyIDR(P) + ", atau";
                        
                        while (true) {
                            let P = document.getElementById("PTextBox").value;
                            P = parseCurrency(P);
                            t++;
                            // Blok kode yang akan diulang
                            if (P > G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)))) {
                              break; // Keluar dari loop jika kondisi tertentu terpenuhi
                            }
                        }
                        document.getElementById("tSaran").innerHTML = "3. Perpanjang durasi investasimu menjadi " + t + " tahun.";
                        
                    }else if(n==4){//tiap 3 bulan
                        P = G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)));
                        P = Math.ceil(P);
                        document.getElementById("PSaran").innerHTML = "1. Tingkatkan nominal tiap investasi menjadi " + formatCurrencyIDR(P) + ", atau";

                        P = G / (((Math.pow(1 + (r / 6), 6 * t) - 1) / (r / 6)));
                        P = Math.ceil(P);
                        document.getElementById("nSaran").innerHTML = "2. Investasi tiap 2 bulan dengan nominal " + formatCurrencyIDR(P) + ", atau";
                        
                        while (true) {
                            let P = document.getElementById("PTextBox").value;
                            P = parseCurrency(P);
                            t++;
                            // Blok kode yang akan diulang
                            if (P > G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)))) {
                              break; // Keluar dari loop jika kondisi tertentu terpenuhi
                            }
                        }
                        document.getElementById("tSaran").innerHTML = "3. Perpanjang durasi investasimu menjadi " + t + " tahun.";
                        
                    } else if(n==3){//tiap 4 bulan
                        P = G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)));
                        P = Math.ceil(P);
                        document.getElementById("PSaran").innerHTML = "1. Tingkatkan nominal tiap investasi menjadi " + formatCurrencyIDR(P) + ", atau";

                        P = G / (((Math.pow(1 + (r / 4), 4 * t) - 1) / (r / 4)));
                        P = Math.ceil(P);
                        document.getElementById("nSaran").innerHTML = "2. Investasi tiap 3 bulan dengan nominal " + formatCurrencyIDR(P) + ", atau";
                        
                        while (true) {
                            let P = document.getElementById("PTextBox").value;
                            P = parseCurrency(P);
                            t++;
                            // Blok kode yang akan diulang
                            if (P > G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)))) {
                              break; // Keluar dari loop jika kondisi tertentu terpenuhi
                            }
                        }
                        document.getElementById("tSaran").innerHTML = "3. Perpanjang durasi investasimu menjadi " + t + " tahun.";
                        
                    } else if(n==2){//tiap 6 bulan
                        P = G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)));
                        P = Math.ceil(P);
                        document.getElementById("PSaran").innerHTML = "1. Tingkatkan nominal tiap investasi menjadi " + formatCurrencyIDR(P) + ", atau";

                        P = G / (((Math.pow(1 + (r / 3), 4 * t) - 1) / (r / 3)));
                        P = Math.ceil(P);
                        document.getElementById("nSaran").innerHTML = "2. Investasi tiap 4 bulan dengan nominal " + formatCurrencyIDR(P) + ", atau";
                        
                        while (true) {
                            let P = document.getElementById("PTextBox").value;
                            P = parseCurrency(P);
                            t++;
                            // Blok kode yang akan diulang
                            if (P > G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)))) {
                              break; // Keluar dari loop jika kondisi tertentu terpenuhi
                            }
                        }
                        document.getElementById("tSaran").innerHTML = "3. Perpanjang durasi investasimu menjadi " + t + " tahun.";
                        
                    } else { //tiap tahun
                        P = G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)));
                        P = Math.ceil(P);
                        document.getElementById("PSaran").innerHTML = "1. Tingkatkan nominal tiap investasi menjadi " + formatCurrencyIDR(P) + ", atau";

                        P = G / (((Math.pow(1 + (r / 6), 6 * t) - 1) / (r / 6)));
                        P = Math.ceil(P);
                        document.getElementById("nSaran").innerHTML = "2. Investasi tiap 6 bulan dengan nominal " + formatCurrencyIDR(P) + ", atau";
                        
                        while (true) {
                            let P = document.getElementById("PTextBox").value;
                            P = parseCurrency(P);
                            t++;
                            // Blok kode yang akan diulang
                            if (P > G / (((Math.pow(1 + (r / n), n * t) - 1) / (r / n)))) {
                              break; // Keluar dari loop jika kondisi tertentu terpenuhi
                            }
                        }
                        document.getElementById("tSaran").innerHTML = "3. Perpanjang durasi investasimu menjadi " + t + " tahun.";
                    }
                }
            }
        }
    }

    function formatCurrencyIDR(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }
});
