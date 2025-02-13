import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser} = useContext(AuthContext)
  //console.log(currentUser);

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Your Dream Home – Explore Like Never Before!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ut voluptas autem accusamus aut. Accusantium suscipit ipsa qui perferendis quia? Eius inventore est maxime animi blanditiis natus consectetur accusamus vitae?
          </p>
          
          <SearchBar />

          <div className="boxes">
            <div className="box">
              <h1>15+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>100</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>500+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
