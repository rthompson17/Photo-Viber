import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'


//posts comes from FeedPage
function Advanced ({posts, addLike}) {
  const [currentIndex, setCurrentIndex] = useState(posts.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(posts.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < posts.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    console.log(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < posts.length) {
      if (dir === 'right') {
        addLike(posts[currentIndex]._id)
      }
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <div className='cardUserName'>
        <br></br>
      <h3>Rate the vibes of dating app photos. Upload your own photos for feedback.</h3>
      <br></br>
      </div>
      <br></br>
      <br></br>
      <div className='tinderCardContainer'>
        {posts.map((character, index, user, username) => (
          
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            // addLike={addLike}
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.photoUrl + ')' }}
              className='tinderCard'
            >
              <h3>{character.user.username}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <br></br>
      <br></br>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')} title="Don't Use">BAD VIBES<br></br>&#x274C;</button>
        {/* <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')} title="Hot">HOT<br></br>&#128293;</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')} title="Aww">CUTE<br></br>&#128522;</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')} title="Sweet">SWEET<br></br>&#10084;</button> */}
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')} title="Good Vibes">GOOD VIBES<br></br>&#10084;</button>
      </div>
      {/* <div className='buttons2'>
        <button style={{ backgroundColor: !canGoBack && '#bfc3f0' }} onClick={() => goBack()}>Undo Swipe</button>
      </div> */}
      {/* {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}!
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button!
        </h2>
      )} */}
    </div>
  )
}

export default Advanced
