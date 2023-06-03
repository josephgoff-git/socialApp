import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { useEffect } from "react"

const Home = ({addActivity}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function setOverflow(input) {
    var home = document.getElementById("home");
  }

  return (
    <div className="home" id="home" >
      <Stories addActivity={addActivity}/>
      <Share addActivity={addActivity}/>
      <Posts addActivity={addActivity}/>
    </div>
  )
}

export default Home