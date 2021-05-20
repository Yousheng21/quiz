import React from 'react';
import "./home.css";
import Footer from "../footer/Footer";
const Home = () => {
    return (
        <div className={'home'}>
            <section>
                <h2>Интелектуальная викторина "Всезнайка"</h2>
                <img src="https://static10.tgstat.ru/channels/_0/59/596a15ae5183df38f4deddea2f9b4f9b.jpg" alt=""/>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum cupiditate debitis deleniti deserunt, dolor dolores, expedita iste natus nobis non perspiciatis possimus quam reprehenderit rerum tempore voluptas voluptatibus voluptatum.   </p>
            </section>
            <section>
                <h2>Четыре вида викторины</h2>
                <img src="https://yt3.ggpht.com/ytc/AAUvwnhdyy9U0RPR5-GjAT1Z-pDoycVa8QJ85n39KzI7TQ=s900-c-k-c0x00ffffff-no-rj" alt=""/>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum cupiditate debitis deleniti deserunt, dolor dolores, expedita iste natus nobis non perspiciatis possimus quam reprehenderit rerum tempore voluptas voluptatibus voluptatum.   </p>
            </section>
            <section>
                <h2>Качество вопросов</h2>
                <img src="https://ksu.edu.ru/images/NEWS-RESERV/9/filolog.png" alt=""/>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum cupiditate debitis deleniti deserunt, dolor dolores, expedita iste natus nobis non perspiciatis possimus quam reprehenderit rerum tempore voluptas voluptatibus voluptatum.   </p>
            </section>
            <section>
                <h2>Более миллиона сыгранных игр</h2>
                <img src="https://держимсявместе.рф/wp-content/uploads/2020/05/chegk.jpg" alt=""/>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum cupiditate debitis deleniti deserunt, dolor dolores, expedita iste natus nobis non perspiciatis possimus quam reprehenderit rerum tempore voluptas voluptatibus voluptatum.   </p>
            </section>
            <section>
                <h2>Наши достижения</h2>
                <img src="https://img2.freepng.ru/20180323/rew/kisspng-trophy-award-competition-cup-medal-golden-cup-5ab5a5db626059.735473981521853915403.jpg" alt=""/>
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum cupiditate debitis deleniti deserunt, dolor dolores, expedita iste natus nobis non perspiciatis possimus quam reprehenderit rerum tempore voluptas voluptatibus voluptatum.   </p>
            </section>
            <Footer/>
        </div>
    );
};

export default Home;