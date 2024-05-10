import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { removePrefix } from '../../modules/Utils/ipfsUtil';

const GameCard = ({ game }) => {
  const starttime = game.startTimestamp;
  const gamestartTime = new Date(parseInt(starttime, 10));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(gamestartTime));

  useEffect(() => {
    // Update the countdown every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(gamestartTime);
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(timer);
  }, []);

  // Function to calculate the time left until the start time
  function calculateTimeLeft(startTime) {
    const difference = +startTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return timeLeft;
  }

  return (
    <Link href={`/games/snl/${game?.gameId}`} className="z-10">
      <div className="border text-black rounded-2xl mt-10 bg-white">
        <div className="w-full">
          {game?.picture ? (<img
            alt="alt"
            src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
              game?.coverImage
            )}`}
            className="rounded-t-2xl"
            style={{ height: '200px', width: '400px' }}
          />) :(
            <img
            alt="alt"
            src="https://images.unsplash.com/photo-1642056448324-922ff603e0c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25ha2VzJTIwYW5kJTIwbGFkZGVyc3xlbnwwfHwwfHx8MA%3D%3D"
            className="rounded-t-2xl"
            style={{ height: '200px', width: '400px' }}
          />
          )}
        </div>
        <div>
        <div className="flex justify-between">
          <div className="pl-4 -mt-12">
            { game?.picture ? (<img
              alt="alt"
              src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
                game?.picture
              )}`}
              className="rounded-full border border-black"
              width="100"
              height="100"
            />):
            (<img
              alt="alt"
              src="https://media.istockphoto.com/id/531466314/vector/snakes-and-ladders.jpg?s=612x612&w=0&k=20&c=YYRwkxtVxAXrYV7kFCHKW4h0SHFS4sSSoaj-s9OeHF4="
              className="rounded-full border border-black"
              width="100"
              height="100"
            />)}
          </div>
          <div className="bg-green-500 rounded-lg px-4 py-2 m-2">Enter game</div>
          </div>

          <div className="m-4">
            <div className="flex justify-between font-bold">
              <h5>
                {game?.name} ({game?.symbol})
              </h5>
            </div>
            <p className="mt-2">{game?.description}</p>
            <div className="mt-2">
              {timeLeft.total > 0 ? (
                <p className="">
                  Time until game starts: <br></br>
                  <div className="text-red-500">
                    {timeLeft.days} days, {timeLeft.hours} hrs,{' '}
                    {timeLeft.minutes} mins, {timeLeft.seconds} sec
                  </div>
                </p>
              ) : (
                <div className="p-2 text-green-500">{/* Ongoing game. */}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
