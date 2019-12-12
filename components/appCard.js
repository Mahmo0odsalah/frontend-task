import React from "react";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AppleIcon from "@material-ui/icons/Apple";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import AndroidIcon from "@material-ui/icons/Android";
import Chart from "react-google-charts";

import { relative } from "path";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: "50px",
    width: "50px"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function RecipeReviewCard(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (data) return;
    if (props.data) setData(props.data);
  });
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const columns = [
    {
      type: "string",
      label: "day"
    },
    {
      label: "no. of users",
      type: "number"
    }
  ];

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={props.avatar} />}
        action={
          <div>
            <IconButton aria-label="share">
              <ShareIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="settings">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </div>
        }
        title={props.name}
        subheader={
          <div>
            <PhoneAndroidIcon fontSize="small" />
            {props.totalUsers} users{" "}
            {props.ios && <AppleIcon fontSize="small" />}
            {props.android && <AndroidIcon fontSize="small" />}
          </div>
        }
      />
      <CardContent style={{ padding: "0 0 0 0" }}>
        <Chart
          chartType="AreaChart"
          width="100%"
          height="100px"
          columns={columns}
          rows={data ? data : props.data}
          options={{
            legend: "none",
            colors: ["#009688"]
          }}
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
