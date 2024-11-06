import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import '../index.css'


function App() {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
   
  
    useEffect(()=> {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {setRobots(users)});

        // Scroll listener
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array, so this runs only once
      

    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
      };


    const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });


        return !robots.length ? 
        <h1 className="righteous-regular">Loading</h1> :
        (
            <div className='tc'>
                <div className={`sticky-top ${isScrolled ? 'scrolled' : ''}`}>
                <h1 className="righteous-regular f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                </div>
                <div className='card-list-container'>
                        <CardList robots={filteredRobots}/>
                </div>
            </div>
        );
    }



export default App;