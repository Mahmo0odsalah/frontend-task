import Arrow from "./floatingArrow";

export default function OverlayGuide(props) {
  return (
    <div
      id="overlay"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: props.show ? "#00000000" : "#00000055",
        zIndex: 5,
        pointerEvents: props.show ? "none" : "auto"
      }}
      onClick={props.handleClick}
    >
      <Arrow
        top="10%"
        left="7%"
        rotate="-90"
        textTop="27%"
        textLeft="4%"
        scale="1"
        text="Search"
      ></Arrow>
      <Arrow
        top="10%"
        left="87%"
        rotate="-90"
        textTop="27%"
        textLeft="83%"
        scale="1"
        text="Log Out"
      ></Arrow>
      <Arrow
        top="56%"
        left="68%"
        rotate="-90"
        textTop="73%"
        textLeft="62%"
        scale="1"
        text="Previous Page"
      ></Arrow>

      <Arrow
        top="46%"
        left="80%"
        rotate="180"
        textTop="67%"
        textLeft="87%"
        scale="1"
        text="Next Page"
      ></Arrow>
    </div>
  );
}
