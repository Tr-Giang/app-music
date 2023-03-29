//1.Render songs
//2.Scroll top
//3.Play / pause / seek
//4.CD rotate
//5.Next / prev
//6. Random
//7. Next / repeat when ended
//8. Active songs
//9. Scroll active song into view
//10.Play song when click


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let isPausing = false;
let cdElement = $('.header__cd img');
let cdWidth = cdElement.offsetWidth;
const arrayKeyframes = [
    { transform: 'rotate(360deg)' }
];
const objProperties = {
    duration: 10000,
    iterations: Infinity,
};
const animateElement = cdElement.animate(arrayKeyframes, objProperties);

const headerNameElement = $('.header__name');
const playElement = $('#play');
const pauseElement = $('#pause');
const audioElement = $('.audio');
const rangePercents = $('#range');
const nextElement = $('#next');
const backElement = $('#back');
let countLoop = false;
let countRandom = false;
const loopElement = $('#loop');
const randomElement = $('#random');


const app = {
    songs: [
        {
            name: 'Em Đồng Ý (I Do)',
            singer: 'Đức Phúc, 911',
            path: './assets/music/songs/EmDongYIDo-DucPhucx911-8679310.mp3',
            image: './assets/music/imgs/yid.jpg'
        },
        {
            name: 'Bật Tình Yêu Lên',
            singer: 'Tăng Duy Tân, Hòa Minzy',
            path: './assets/music/songs/BatTinhYeuLen-TangDuyTanHoaMinzy-8715666.mp3',
            image: './assets/music/imgs/btyl.jpg'
        },
        {
            name: 'Nếu Lúc Đó',
            singer: 'tlinh, 2pillz',
            path: './assets/music/songs/NeuLucDo-tlinh2pillz-8783613.mp3',
            image: './assets/music/imgs/nld.jpg'
        },
        {
            name: 'Ghệ Iu Dấu Của Em Ơi',
            singer: 'tlinh, 2pillz, WOKEUP',
            path: './assets/music/songs/GheIuDauCuaEmOi-tlinh2pillzWOKEUPAT4AM-8677578.mp3',
            image: './assets/music/imgs/gidceo.jpg'
        },
        {
            name: '11:11',
            singer: 'MiiNa (DREAMeR), RIN9, DREAMeR',
            path: './assets/music/songs/1111-MiiNaDREAMeRRIN9DREAMeRVietNam-8721776.mp3',
            image: './assets/music/imgs/1111.jpg'
        },
        {
            name: 'Người Rất Tốt Không Gặp Sẽ Tốt Hơn',
            singer: 'Hiền Hồ',
            path: './assets/music/songs/NguoiRatTotKhongGapSeTotHon-HienHo-8738680.mp3',
            image: './assets/music/imgs/ntgnth.jpg'
        },
        {
            name: 'Cô Gái Này Là Của Ai?',
            singer: 'KxR, Nhi Nhi',
            path: './assets/music/songs/CoGaiNayLaCuaAi-KrixRushDoanQuocVinhNhiNhi-6926198.mp3',
            image: './assets/music/imgs/cgnca.jpg'
        },
        {
            name: 'Rồi Ta Sẽ Ngắm Pháo Hoa Cùng Nhau',
            singer: 'O.lew',
            path: './assets/music/songs/RoiTaSeNgamPhaoHoaCungNhau-OlewVietNam-8485329.mp3',
            image: './assets/music/imgs/rtsnphcn.jpg'
        },
        {
            name: 'Bo Xì Bo',
            singer: 'Hoàng Thùy Linh',
            path: './assets/music/songs/BoXiBo-HoangThuyLinh-7702270.mp3',
            image: './assets/music/imgs/bxb.jpg'
        },
        {
            name: 'Để Tôi Ôm Em Bằng Giai Điệu Này',
            singer: 'Kai Đinh, MIN, GREY D',
            path: './assets/music/songs/DeToiOmEmBangGiaiDieuNay-KaiDinhMINGREYD-8416034.mp3',
            image: './assets/music/imgs/dtyebgdn.jpg'
        },
        {
            name: 'Em Là Kẻ Đáng Thương',
            singer: 'Phát Huy T4',
            path: './assets/music/songs/EmLaKeDangThuong-PhatHuyT4-8504796.mp3',
            image: './assets/music/imgs/elkdt.jpg'
        },
        {
            name: 'Mong Một Ngày Anh Nhớ Đến Em',
            singer: 'Huỳnh James, Pjnboys',
            path: './assets/music/songs/MongMotNgayAnhNhoDenEm-HuynhJamesPjnboys-8653756.mp3',
            image: './assets/music/imgs/mmnande.jpg'
        },
        {
            name: 'Waiting For You',
            singer: 'MONO, Onionn',
            path: './assets/music/songs/WaitingForYou-MONOOnionn-7733882.mp3',
            image: './assets/music/imgs/wtfu.jpg'
        },
        {
            name: 'Như Anh Đã Thấy Em',
            singer: 'PhucXP, Freak D',
            path: './assets/music/songs/NhuAnhDaThayEm-PhucXPFreakD-7370334.mp3',
            image: './assets/music/imgs/nadte.jpg'
        },
    ],

    //render HTML :


    renderHTML: function () {
        let html = this.songs.map((song, index) => {
            return ` <li class="play-list__item" data-id= "${index}">
              <div class="play-list__item__image">
                <img src="${song.image}" alt="image music" />
              </div>
              <div class="play-list__item__content">
                <h2 class="play-list__item__name">${song.name}</h2>
                <p class="play-list__item__singer">${song.singer}</p>
              </div>
              <div class="play-list__item__more">
                <i class="fa-solid fa-ellipsis"></i>
              </div>
            </li>
        `;
        });
        $('.play-list').innerHTML = html.join('\n');

    },

    //scroll to top :

    handleEvent: function () {

        //cuộn màn hình:
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop; //lấy ra xem đã scroll top được bn px.
            let setHeightCD = cdWidth - scrollTop;
            cdElement.style.height = setHeightCD > 0 ? setHeightCD + 'px' : 0;
            cdElement.style.opacity = setHeightCD / cdWidth;
        };

        //xử lý CD thump :

        animateElement.pause();

        // click nút play:
        playElement.onclick = function () {
            if (isPausing) {
                audioElement.play();
            }
        };
        //click nút pause:
        pauseElement.onclick = function () {
            if (!isPausing) {
                audioElement.pause();
            }
        };

        //Khi song được play:

        audioElement.onplay = function () {

            isPausing = false;
            playElement.style.display = 'none';
            pauseElement.style.display = 'inline-block';
            animateElement.play();



            const songElements = $$('.play-list__item');
            songElements.forEach((songElement) => {
                if (songElement.classList.contains('active')) songElement.classList.remove('active');
            });

            let idSongs = Number(audioElement.dataset.id);
            let songActive = $([`li[data-id="${idSongs}"]`]);
            songActive.classList.add('active');

            setTimeout(() => {
                songActive.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 300);
        };

        //Khi song bị pause:
        audioElement.onpause = function () {
            isPausing = true;
            pauseElement.style.display = 'none';
            playElement.style.display = 'inline-block';
            animateElement.pause();
        };


        this.addSong();


        //khi thời gian phát nhạc thay đổi:
        audioElement.ontimeupdate = function () {
            const timeToPercents = audioElement.currentTime / audioElement.duration * 100;
            const currentTime = $('.current-time');
            const fullTime = $('.full-time');
            if (timeToPercents) {
                rangePercents.value = timeToPercents;

            }
            currentTime.textContent = audioElement.currentTime % 60 < 10 ? `0${Math.floor(audioElement.currentTime / 60)} : 0${Math.floor(audioElement.currentTime % 60)}` : `0${Math.floor(audioElement.currentTime / 60)} : ${Math.floor(audioElement.currentTime % 60)}`;
            fullTime.textContent = audioElement.duration % 60 < 10 ? `0${Math.floor(audioElement.duration / 60)} : 0${Math.floor(audioElement.duration % 60)}` : `0${Math.floor(audioElement.duration / 60)} : ${Math.floor(audioElement.duration % 60)}`;
        };

        //thời gian thanh âm thanh chạy:
        rangePercents.onchange = function () {
            audioElement.currentTime = rangePercents.value * audioElement.duration / 100;
        };



        //lặp lại 1 bài hát
        loopElement.onclick = function () {
            if (!countLoop) {
                countLoop = true;
                audioElement.loop = true;
                loopElement.style.color = '#222';
                loopElement.style.transform = 'scale(1.25)';
            }
            else {
                countLoop = false;
                audioElement.loop = false;
                loopElement.style.color = '#777';
                loopElement.style.transform = 'scale(1)';

            }
        };


        //function nextback



        this.nextBackSong();


        //random khi change bài

        randomElement.onclick = function () {
            if (!countRandom) {
                countRandom = true;
                randomElement.style.color = '#222';
                randomElement.style.transform = 'scale(1.25)';
                let arrayRandom = [Number(audioElement.dataset.id)];

                const randomAudio = function () {
                    randomID = Math.floor(Math.random() * app.songs.length);
                    if (arrayRandom.includes(randomID)) {
                        randomAudio();
                    } else {
                        audioElement.querySelector('source').src = app.songs[randomID].path;
                        headerNameElement.innerHTML = app.songs[randomID].name;
                        $('.header__cd img').src = app.songs[randomID].image;
                        audioElement.dataset.id = randomID;
                        arrayRandom.push(randomID);
                    }

                    if (arrayRandom.length >= 14) arrayRandom = [];
                };

                //khi hết bài hát thì tự next
                audioElement.onended = function () {
                    randomAudio();
                    app.changeSong();
                    animateElement.cancel();
                };


                // click next song
                nextElement.onclick = function () {
                    randomAudio();
                    app.changeSong();
                    animateElement.cancel();
                };

                //click back song
                backElement.onclick = function () {
                    randomAudio();
                    app.changeSong();
                    animateElement.cancel();
                };
            }
            else {
                countRandom = false;
                randomElement.style.color = '#777';
                randomElement.style.transform = 'scale(1)';
                //khi hết bài hát thì tự next
                app.nextBackSong();
            }
        };

    },

    // chọn song:

    addSong: function () {
        const songElements = $$('.play-list__item');

        songElements.forEach(function (songElement, index1) {
            songElement.onclick = function () {
                let audioObj = app.songs.find((song, index2) => {
                    return index1 == index2;
                });
                audioElement.querySelector('source').src = audioObj.path;
                headerNameElement.innerHTML = audioObj.name;
                $('.header__cd img').src = audioObj.image;
                if (songElement.dataset.id !== audioElement.dataset.id) {
                    audioElement.load();
                }
                audioElement.dataset.id = index1;
                audioElement.play();
                animateElement.cancel();
            };
        });
    },


    //thay đổi song:
    changeSong: function () {
        audioElement.load();
        audioElement.play();
    },

    // next, back song mặc định :

    nextBackSong: function () {
        const nextSong = function () {
            let idAudioObj = Number(audioElement.dataset.id);
            if (idAudioObj < app.songs.length - 1) {
                audioElement.querySelector('source').src = app.songs[idAudioObj + 1].path;
                headerNameElement.innerHTML = app.songs[idAudioObj + 1].name;
                $('.header__cd img').src = app.songs[idAudioObj + 1].image;
                audioElement.dataset.id = idAudioObj + 1;
            }
            else {
                audioElement.querySelector('source').src = app.songs[0].path;
                headerNameElement.innerHTML = app.songs[0].name;
                $('.header__cd img').src = app.songs[0].image;
                audioElement.dataset.id = 0;
            }
        };

        //Default next:
        audioElement.onended = function () {
            nextSong();
            app.changeSong();
            animateElement.cancel();
        };


        // click next song
        nextElement.onclick = function () {
            nextSong();
            app.changeSong();
            animateElement.cancel();
        };

        //click back song
        backElement.onclick = function () {
            let idAudioObj = Number(audioElement.dataset.id);
            if (idAudioObj > 0) {
                audioElement.querySelector('source').src = app.songs[idAudioObj - 1].path;
                headerNameElement.innerHTML = app.songs[idAudioObj - 1].name;
                $('.header__cd img').src = app.songs[idAudioObj - 1].image;
                audioElement.dataset.id = idAudioObj - 1;
            }
            else {
                audioElement.querySelector('source').src = app.songs[app.songs.length - 1].path;
                headerNameElement.innerHTML = app.songs[app.songs.length - 1].name;
                $('.header__cd img').src = app.songs[app.songs.length - 1].image;
                audioElement.dataset.id = app.songs.length - 1;
            }
            app.changeSong();
            animateElement.cancel();
        };
    },

    start: function () {
        this.renderHTML();
        this.handleEvent();
    },


};



app.start();


;
