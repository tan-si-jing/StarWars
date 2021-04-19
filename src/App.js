import './App.css';
import Search from './Search';

function App() {
  return (
    <div className="App">
      <table className="Table-div">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>gender</td>
          </tr>
          <tr>
            <td>height</td>
          </tr>
          <tr>
            <td>mass</td>
          </tr>
          <tr>
            <td>hair_color</td>
          </tr>
          <tr>
            <td>homeworld</td>
          </tr>
          <tr>
            <td>starships</td>
          </tr>
        </tbody>
      </table>
      <table className="Table-div"><Search></Search></table>
      <table className="Table-div"><Search></Search></table>
      <table className="Table-div"><Search></Search></table>
    </div>
  );
}

export default App;
