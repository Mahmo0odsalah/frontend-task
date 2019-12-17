import { makeStyles } from "@material-ui/core/styles";

export default function FloatingArrow(props) {
  const useStyles = makeStyles({
    "@keyframes moveUp": {
      "0%": {
        transform:
          "translateY(0%) rotate(" +
          props.rotate +
          "deg) scaleX(" +
          props.scale +
          ");"
      },
      "50%": {
        transform:
          "translateY(10%) rotate(" +
          props.rotate +
          "deg) scaleX(" +
          props.scale +
          ");"
      },

      "100%": {
        transform:
          "translateY(0%) rotate(" +
          props.rotate +
          "deg) scaleX(" +
          props.scale +
          ");"
      }
    },
    "@keyframes textMoveUp": {
      "0%": {
        transform: "translateY(0%)"
      },
      "50%": {
        transform: "translateY(10%)"
      },

      "100%": {
        transform: "translateY(0%)"
      }
    },
    move_up: {
      "animation-name": `$moveUp`,
      "animation-duration": "2s",
      "animation-iteration-count": "infinite"
    },
    text_move_up: {
      position: "absolute",
      top: props.textTop,
      left: props.textLeft,
      "animation-name": `$textMoveUp`,
      "animation-duration": "2s",
      "animation-iteration-count": "infinite"
    }
  });
  const classes = useStyles();

  return (
    <div>
      <img
        src="/arrow.png"
        alt="arrow"
        style={{
          width: "10%",
          position: "absolute",
          top: props.top,
          left: props.left
        }}
        className={classes.move_up}
      ></img>
      <p className={classes.text_move_up}>{props.text}</p>
    </div>
  );
}
