import my_marker from "../assets/myMarker.png"
import their_marker from "../assets/theirMarker.png"
import "../css/Legend.css";

export default function Legend() {
  return (
    <div className="legend">
      <h6>Legend</h6>
      <p className="text">
        <img src={my_marker}></img> Your location
      </p>
      <p className="text">
        <img src={their_marker}></img> Their location
      </p>
    </div>
  );
}