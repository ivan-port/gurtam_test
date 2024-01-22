let map,marker;
/**координаты по умолчанию */
var city_coordinate_late=54.731150584566386;
var city_coordinate_lng=25.213333618715918;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  let pos={ lat: city_coordinate_late, lng: city_coordinate_lng};



  map = new Map(document.getElementById("map"), {
    center: pos,
    zoom: 12,
  });

  marker=new google.maps.Marker({
    position:pos,
    map:map,
    title:"Ты навел на меня"
  })
}
initMap()


let countryList=[
  {id:0,name:'Австрия'},
  {id:1,name:'Беларусь'},
  {id:2,name:'Германия'},
  {id:3,name:'Италия'},
  {id:4,name:'США'},
  ];

  let cityList=[
    {id:0,
    name:'Вена',
    coordinate_late:48.194343079696225,
    coordinate_lng:16.382117695002083,
    },
    {id:0,
      name:'Грац',
      coordinate_late:47.07236750160507,
      coordinate_lng:15.43398908001544,
      },
    {id:0,
      name:'Иннсбурк',
      coordinate_late:47.263443616970787,
      coordinate_lng:11.39478416264674,
      },
    {id:1,
      name:'Минск',
      coordinate_late:53.90751385632233,
      coordinate_lng:27.556141604175497,
      },
    {id:1,
      name:'Гродно',
      coordinate_late:53.678308019525346,
      coordinate_lng:23.831345402914614,
      },
    {id:1,
      name:'Брест',
      coordinate_late:52.08294987530758,
      coordinate_lng:23.658152830474688,
      },
    {id:2,
      name:'Берлин',
      coordinate_late:52.51690267898324,
      coordinate_lng:13.377762789392206,
      },
    {id:2,
      name:'Мюнхен',
      coordinate_late:48.164270848206556,
      coordinate_lng:11.505784670024177,
      },
    {id:2,
      name:'Бремен',
      coordinate_late:53.07629768273568,
      coordinate_lng:8.807465445088233,
      },
    {id:3,
      name:'Рим',
      coordinate_late:41.89336698687199,
      coordinate_lng:12.49230079969663,
      },
    {id:3,
      name:'Неаполь',
      coordinate_late:40.84441831275505,
      coordinate_lng:14.238759114310088,
      },
    {id:3,
      name:'Больцано',
      coordinate_late:46.49833901834015,
      coordinate_lng:11.35487253516838,
      },
    {id:4,
    name:'Вашингтон',
    coordinate_late:38.89265656694684,
    coordinate_lng:-77.05097078408576,
    },
    {id:4,
      name:'Нью-Йорк',
      coordinate_late:40.69348851889265,
      coordinate_lng:-74.04426169202131,
      },
    {id:4,
      name:'Чикаго',
      coordinate_late:41.76980714724205,
      coordinate_lng:-87.56488129172301,
      },

  ]


let country=document.querySelector('.wialon-map_input__country');/*инпут страны */
let wraper=document.querySelector('.wialon-map_input__country_list');/* обвертка списка*/
let spisok=document.querySelectorAll('.spisok_country')/*список cтран */


let city=document.querySelector('.wialon-map_input__city');/*инпут городов */
let wraper_city=document.querySelector('.wialon-map_input__city_list');/* обвертка списка*/
let spisok_city=document.querySelectorAll('.spisok_city')/*список городов */

let knopka=document.querySelector(".wialon-map_button");


let error_country=document.querySelector(".wialon-map_input__country");/**выделение инпута при ошибке */



let name_Country;
var massCity;
country.addEventListener("click",function(){
  wraper.classList.toggle("active");
  city.value='';
  country.classList.remove("error");
})

let i=0;
spisok.forEach(function(e){
  e.innerHTML=countryList[i].name;
  i++;
  e.addEventListener("click", function(){
    wraper.classList.toggle("active");/**скрываем список стран */

    name_Country=e.textContent;
    country.value=name_Country;/**присваиваем инпуту название выбранной страны */

    let spisCountryID=countryList.find(item=>item.name==name_Country);/**из объекта достали нашу страну*/
    console.log(spisCountryID.id);/**по стране нашли id */

    let spisCity=cityList.filter(item=>item.id==spisCountryID.id);/*по id cтраны нашли  города и координаты */
    console.log(spisCity);

    massCity=spisCity.map(item=>item.name);/**из фильтрованного списка городов находим имена городов */
    console.log(massCity)
    let b=0;
    spisok_city.forEach(function(e){
     e.innerHTML=massCity[b];
      b++;})
  
  })
})


city.addEventListener("click",function(){
  city.classList.remove("error")

  if(country.value==''){
    country.classList.add("error")
    country.placeholder='Для начала выберите страну';
  }
  else{
    wraper_city.classList.toggle("active");
    country.classList.remove("error");
}
})

var coordinate_city;
spisok_city.forEach(function(e){
  e.addEventListener('click',function(b){
    wraper_city.classList.toggle("active");/**скрываем список стран */
    city.value=e.textContent;/**присваиваем инпуту название выбранной страны */
   coordinate_city=cityList.find(item=>item.name==city.value);/*берем из импута города название и по названию находим объект с координатами */
   city_coordinate_late=coordinate_city.coordinate_late;/**широта */
   city_coordinate_lng=coordinate_city.coordinate_lng; /*долгота*/
  })
  
})


knopka.addEventListener("click",function(){/**запускает функцию поиска по координатам */
  if(country.value==''){
    country.classList.add("error")
    country.placeholder='Выберите страну';
  }
  if(city.value==''){
    city.classList.add("error")
    city.placeholder='Выберите Ваш город';
  }
else{
  initMap();
}
})

/**Кнопки для получения демо  */
let click_demo=document.querySelector('.menu__button_demo');
let window_demo_cross=document.querySelector('.wialon-demo_cross');
let wialon_demo=document.querySelector('.wialon-demo');

window_demo_cross.addEventListener('click',function(){
  wialon_demo.setAttribute("style","display:none");
})
/**Кнопка заказать */
let order=document.querySelector('.menu__button_order');
let title=document.querySelector('.wialon-demo_title');/**Текст с демо или заказ */
order.addEventListener('click',function(){
  wialon_demo.setAttribute("style","display:block");
  title.innerHTML='Для уточнения деталей заказа Пожалуйста оставте ваши контактные данные';
  console.log(title.textContent) 
});

/**Эфект нажатия на кнопку */
clickBtn(order);
clickBtn(click_demo);



/**Открытие формы для получением демо */
click_demo.addEventListener('click',function(){
  wialon_demo.setAttribute("style","display:block");
  title.innerHTML='Оставте ваши контактные данные и мы вышлем Вам демоверсию продукта'
  console.log(title.textContent)   
});

document.addEventListener('DOMContentLoaded',function(){

  /**Находим все наши формы которые будем отправлять */
  const feedForm=document.querySelectorAll('.feed-form');
  const inputs=document.querySelectorAll('._req');/**проверка ввода*/

  inputs.forEach(function(element){
      element.addEventListener('focus',(e)=>{
          formRemoveError(element);
      });
  })
  let size=document.querySelector('.wialon-demo'); /**уменьшаем в размере окно */
  let TextMessage=document.querySelector('.wialon-demo_response');/**Текст о успешной отправке*/
  /**кнопка получить демо */
  let receive_demo=document.querySelector('.wialon-demo_btn');
  clickBtn(receive_demo);                                            /**эфект кнопок */
  


  /**Действия при нажатии кнопки "заказть консультацию" либо "купить" */
  feedForm.forEach(function(element){                                     /**перебираем все формы */         
      element.addEventListener('submit',  async function formSend(e){     /**отправка формы */
      e.preventDefault();                                              /**запрещаем стандартную отправку формы */
      let error=formValidate(element);                                    /**переменная error для подсчета ошибок, не обязательная */
      function formValidate(form){
          let error=0;
          let formReq=element.querySelectorAll('._req');                    /**Находим все инпуты(_req) на конкретной форме, которые необходимо проверить */
          console.log(formReq)
          for (let index = 0; index < formReq.length; index++) {          /**перебираем все инпуты через цикл */
              const input = formReq[index];
              formRemoveError(input);                                     /**удаляем клacс с ошибкой  */                
  
              if(input.classList.contains('_email')){                     /**Проверяем email */
                  if(emailTest(input)){
                      formAddError(input);
                      error++;
                  }
              }   
              else {
                      if (input.value=='') {                              /**Проверяем на пустое поле.Проверка на номер телефона сделано через jQuery в верху кода*/                    
                      formAddError(input);
                      error++;  
                      }
                      else{formRemoveError(input); }
                  }
          }
          return error; 
      }
      /**отправка формы */
      var formData = new FormData(element);/**забирает данные с формы в виде ключ,значение */
      /**formData.append('order','Консультация')добавляем  к formData наш заказ */
      for (let [key, value] of formData) { /**проверка для нас */
      console.log(`${key} - ${value}`)};



      if(error===0){
            element.classList.add('_sending');/**картинка с загрузкой */
          let response=await fetch('../smart.php',{
              method:'POST',
              body:formData
          });
              if(response.ok){
                element.classList.remove('_sending');
                element.classList.add('_hidden'); /*скрываем наши инпуты */
                size.classList.add('size'); /**уменьшаем в размере окно */
                TextMessage.classList.add('message');/**Текст о успешной отправке*/

                element.reset();
                /*let result=await response.json();
                alert(result.message);*/
              }
               else{
                  alert('Ошибка')
              }
              let btnOk=document.querySelector('.wialon-demo_response-btn');
             /**закрытие по кнопке */
              btnOk.addEventListener ('click',function(){
                wialon_demo.setAttribute("style","display:none");
                element.classList.remove('_hidden');
                size.classList.remove('size');
                TextMessage.classList.remove('message');
              })
              /**закрытие по крестику */
              window_demo_cross.addEventListener('click',function(){
                wialon_demo.setAttribute("style","display:none");/**закрываем форму */
                element.classList.remove('_hidden');/**показываем инпуты для следуещего клика */
                size.classList.remove('size');/**Изначальный размер окна для следуещего клика */
                TextMessage.classList.remove('message');/**Удаляем текст о успешной отправке */
              })

      }


  });   /**отправка формы */

  });



});

/** Блок Решайте любую задачу с системой мониторинга автотранспорта Wialon */
 let taskButton=document.querySelectorAll('.task-wialon_button');/**кнопка с задачами */
 let picture=document.querySelectorAll('.task-wialon_image');/**картинка */

 
 taskButton.forEach(function(element){ /**перебираем все кнопки */
    clickBtn(element);/**эффект нажатия */
    element.addEventListener('click',function(){
        taskButton.forEach(function(e){    /**удаляем фон активной кнопки */
          e.classList.remove('active')
        })
      element.classList.add('active');/**добавляем фон к нажатой кнопке */

      picture.forEach(function(pict){              /**перебираем все картинки */
        pict.classList.remove('active');           /**удаляем класс активности у картинки */
       /* pict.classList.add('timeLeft')
        setTimeout(()=>{
          pict.classList.remove('timeLeft')},'1100')*/

          if(element.dataset.id==pict.dataset.id){ /**если дата сет совпал у картинки и у кнопки добавляем класс к картинке и ее видно */
            pict.classList.add('active');

          }
      })
    })
 })
 

/**Добавляем класс ошибке */
function formAddError(input){
  input.classList.add('_error')
}
/**удаляем класс у ошибки */
function formRemoveError(input){
  input.classList.remove('_error')
}
/**функция проверки email */
function emailTest(input){
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);/**если есть ошибка то true */
}

let find_map=document.querySelector('.about-wialon_button');
clickBtn(find_map);
clickBtn(knopka);/**кнопка которая запускает поиск городов на карте */

/**Эфект нажатия на кнопку */
function clickBtn(x){
  x.addEventListener('mousedown',function(event){
  if(event.button==0){
    x.setAttribute('style','transform:scale(1.04) rotate(0deg); transition: all 0.2s;');
  }
})
x.addEventListener('mouseup',function(event){
  if(event.button==0){
    x.setAttribute('style','transform:scale(1) rotate(0deg);transition: all 0.2s');
  }
})
};

/**выделение всех инпутов при клике */
let allInput=document.querySelectorAll('input');
focusInput(allInput);

function focusInput(x){
  x.forEach(function(e){
    e.addEventListener('focus',function(){
      e.setAttribute("style","box-shadow:7px 5px 5px rgba(0, 0, 255, .3);")
    }
    )
    e.addEventListener('blur',function(){
      e.setAttribute("style","box-shadow:;")
    }
    )
  })
  }

/**Hamburger*/
let hamburger=document.querySelector('.hamburger')
let menushka=document.querySelector('.menu__links')

hamburger.addEventListener('click',function(event){
  hamburger.classList.toggle('active');
  menushka.classList.toggle('active');
})

let link=document.querySelectorAll('.menu__link')
link.forEach(function(element){
  element.addEventListener('click',()=>{
    hamburger.classList.remove('active');
    menushka.classList.remove('active');
  })
})

/**меняем placeholder input после разрешения в 768px */
window.addEventListener('resize',function () {
  if(innerWidth <= 768){
    city.setAttribute('placeholder',  'Город');
    country.setAttribute('placeholder',  'Страна');
  }
  else{
    city.setAttribute('placeholder',  'Выберите ваш город');
    country.setAttribute('placeholder',  'Выберите вашу страну');
  }
});

/**Полоса прокрутки для кнопок task-wialon*/
let taskButtons=document.querySelector('.task-wialon_buttons');/**наш объект с кнопками */
/**taskButton -все наши кнопки*/
taskButton.forEach(function(element){
  element.addEventListener("click", function(){
    let c = element.getBoundingClientRect(),/*положение элемента относительно видимой части viewport, функции включает и другие значения */
    scroll_bar = taskButtons.scrollLeft + c.left-15;/*15 поправочный коэф., так как имеем отступы по краям */
    console.log(taskButtons.scrollLeft);/*текущее положение прокрутки */
    taskButtons.scrollLeft=scroll_bar;
  })
});




  




















  
