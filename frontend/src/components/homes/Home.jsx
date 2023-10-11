
import './Home.css';

const Home = () => {
  return (
    <div className='container'>    
      <div className='searchBar'>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>     
    </div>
  );
};

export default Home;
