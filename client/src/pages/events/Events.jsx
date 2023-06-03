import { useEffect, useState } from "react";
import "./events.scss";
import { FiChevronRight } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';
import moment from "moment";

var totalValue = 13;

const Events = () => {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  var random1 = 0;
  var random2 = 1;
  var random3 = 1;
  var random4 = 2;
  var random5 = 4;
  var random6 = 5;
  var random7 = 6;
  var random8 = 6;
  var random9 = 8;
  var random10 = 9;
  var random11 = 9;
  var random12 = 10;
  var random13 = 11;
  var random14 = 12;
  var random15 = 13;

  var events = [
   {key: 0, title: "Beachside Bonfire", description: "Join us tonight at Wayside Beach for a bonfire with friends and s'mores.", day: moment().add(random1, 'days').date(), dayOfYear: ((moment().add(random1, 'days').month() * 100) +  moment().add(random1, 'days').date()), src: "https://images.unsplash.com/photo-1536714410921-b34258824c8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjE4fHxiZWFjaHNpZGUlMjBib25maXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
   {key: 1, title: "Neon Nights Rave", description: "Get ready to dance the night away in a neon wonderland", day: moment().add(random2, 'days').date(), dayOfYear: ((moment().add(random2, 'days').month() * 100) +  moment().add(random2, 'days').date()), src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVvbiUyMHBhcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
   {key: 2, title: "Outdoor Movie Night", description: "Enjoy a classic movie under the stars and great deals at our late night snackbar", day: moment().add(random3, 'days').date(), dayOfYear: ((moment().add(random3, 'days').month() * 100) +  moment().add(random3, 'days').date()), src: "https://images.unsplash.com/photo-1612572860155-f0b661036344?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1bW1lciUyMGJhY2t5YXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
   {key: 3, title: "Afternoon Garden Party", description: "Enter a hidden oasis and revel in enchanting festivities.", day: moment().add(random4, 'days').date(), dayOfYear: ((moment().add(random4, 'days').month() * 100) +  moment().add(random4, 'days').date()), src: "https://images.unsplash.com/photo-1561058318-2dd1655a97b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGdhcmRlbiUyMHBhcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
   {key: 4, title: "Mixology Masterclass", description: "Learn the art of crafting sensational cocktails from experts.", day: moment().add(random5, 'days').date(), dayOfYear: ((moment().add(random5, 'days').month() * 100) +  moment().add(random5, 'days').date()), src: "https://images.unsplash.com/photo-1604868291746-80e874a80e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fG1peG9sb2d5fGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
   {key: 5, title: "Mini Golf & Ice Cream", description: "$5 pass for several hours of minigolf and ice cream!", day: moment().add(random6, 'days').date(), dayOfYear: ((moment().add(random6, 'days').month() * 100) +  moment().add(random6, 'days').date()), src: "https://images.unsplash.com/photo-1657085716783-c0afbdabf96e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWluaWdvbGZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"}, 
   {key: 6, title: "Beach Volleyball Showdown", description: "Full day of beach volleyball with a tournament and prize!", day: moment().add(random7, 'days').date(), dayOfYear: ((moment().add(random7, 'days').month() * 100) +  moment().add(random7, 'days').date()), src: "https://images.unsplash.com/photo-1564695904932-9b5cae20083e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVhY2glMjB2b2xsZXliYWxsfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
   {key: 7, title: "Coastal Glow Party", description: "Free entry for an all-night long dance under neon lights!", day: moment().add(random8, 'days').date(), dayOfYear: ((moment().add(random8, 'days').month() * 100) +  moment().add(random8, 'days').date()), src: "https://images.unsplash.com/photo-1512093794060-0e9ccb86b3b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2xvd3N0aWNrfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
   {key: 8, title: "Food Truck Fiesta", description: "Savor mouthwatering delicacies from the finest food trucks in town.", day: moment().add(random9, 'days').date(), dayOfYear: ((moment().add(random9, 'days').month() * 100) +  moment().add(random9, 'days').date()), src: "https://images.unsplash.com/photo-1604467715878-83e57e8bc129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGZvb2QlMjB0cnVja3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"},
   {key: 9, title: "Skydiving Adventure", description: "Experience the thrill of freefall and soar above the clouds.", day: moment().add(random10, 'days').date(), dayOfYear: ((moment().add(random10, 'days').month() * 100) +  moment().add(random10, 'days').date()), src: "https://images.unsplash.com/photo-1514884025921-b2fcdef84707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwZGl2aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"},
   {key: 10, title: "Secret Rooftop Soiree", description: "Join us for an exclusive party with stunning skyline views.", day: moment().add(random11, 'days').date(), dayOfYear: ((moment().add(random11, 'days').month() * 100) +  moment().add(random11, 'days').date()), src: "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHJvb2Z0b3B8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"},
   {key: 11, title: "Oasis Music Festival", description: "Groove to live music performances in an outdoor concert setting.", day: moment().add(random12, 'days').date(), dayOfYear: ((moment().add(random12, 'days').month() * 100) +  moment().add(random12, 'days').date()), src: "https://images.unsplash.com/photo-1619229725920-ac8b63b0631a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"},
   {key: 12, title: "Kayaking on Lake Morey", description: "Paddle through breathtaking scenery on an exciting kayak tour.", day: moment().add(random13, 'days').date(), dayOfYear: ((moment().add(random13, 'days').month() * 100) +  moment().add(random13, 'days').date()), src: "https://images.unsplash.com/photo-1661442976561-c13dac243ae1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGtheWFraW5nJTIwbGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"},
   {key: 13, title: "Riverside Farmers' Market", description: "Fresh local ingredients and delicious food stands everywhere you look!", day: moment().add(random14, 'days').date(), dayOfYear: ((moment().add(random14, 'days').month() * 100) +  moment().add(random14, 'days').date()), src: "https://images.unsplash.com/photo-1606141396269-fd018eb08d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGZhcm1lcnMlMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"},
   {key: 14, title: "Sunset Salsa Party", description: "Doors open at 9: Spend the night dancing to salsa rhythms at a beach club", day: moment().add(random15, 'days').date(), dayOfYear: ((moment().add(random15, 'days').month() * 100) +  moment().add(random15, 'days').date()), src: "https://images.unsplash.com/photo-1662950267280-0cdf5f7139b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM1fHxiZWFjaCUyMGNsdWJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60"},
  //  empty -> {key: , title: "", description: "", day: moment().add(random13, 'days').date(), dayOfYear: ((moment().add(random13, 'days').month() * 100) +  moment().add(random13, 'days').date()), src: ""},
  ]


  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  const [day, setDay] = useState(moment().add(totalValue, 'days').date())
  const [month, setMonth] = useState(moment().add(totalValue, 'days').month())
  const [dayOfYear, setDayOfYear] = useState((moment().add(totalValue, 'days').month() * 100) + moment().add(totalValue, 'days').date())

  function handleClick(value) {
    if (totalValue + value >= 0) {
      totalValue += value;
      setDay(moment().add(totalValue, 'days').date());
      setMonth(moment().add(totalValue, 'days').month());
      setDayOfYear((moment().add(totalValue, 'days').month() * 100) + moment().add(totalValue, 'days').date())
    }
  }

  var eventsVisible = events.filter(item => item.dayOfYear <= dayOfYear)

  return (
    <div className="events">
       <div className="title">
        Events Near You
       </div>
       
       <div className="bar">
          <button>
            Today
          </button>
          <p>{months[moment().month()]} {moment().date()}  -  {months[month]} {day}</p>
          <FiChevronLeft onClick={()=>{handleClick(-1)}} fontSize={24} className="chev-left"/>
          <FiChevronRight onClick={()=>{handleClick(1)}} fontSize={24} className="chev-right"/>
       </div>

       <div className="grid" id="grid">
        {[...Array(eventsVisible.length)].map((_, index) =>  (
          <a
            key={index}
            className="box"
            href={eventsVisible[index].src} 
          >
            <img src={eventsVisible[index].src} alt="" />
            <div className="bottom">

              <div className="date">
                  {eventsVisible[index].day}
              </div>
              <div className="p">
                  <p className="p1">{eventsVisible[index].title}</p>
                  <p className="p2">{eventsVisible[index].description}</p>
              </div>
            </div>
       
          </a>
        ))}
      </div>

    </div>
  );
};

export default Events;
