import { withRouter } from "next/router";
import nextCookie from "next-cookies";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navBar";
import AppCard from "../../components/appCard";
import Overlay from "../../components/overlayGuide";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const Dashboard = ({ user, token, username }) => {
  const router = useRouter();
  const [apps, setApps] = useState([]);
  const [userData, setUser] = useState({});
  const [card, setCard] = useState(null);
  const [page, setPage] = useState(1);
  const firstTime = useRef(true);
  const [overlayInput, setOverlayInput] = useState(false);
  let cards = [];
  useEffect(() => {
    if (cards && cards.length && card && !card.length) setCard(cards);
    if (!firstTime.current && !(token && username)) {
      router.push("/");
      return;
    }
    if (!firstTime.current) return;
    firstTime.current = false;
    (async () => {
      await axios
        .all([
          axios.get("https://pushbots-fend-challenge.herokuapp.com/api/me", {
            headers: {
              Authorization: "Bearer " + token
            }
          }),
          axios.get(
            "https://pushbots-fend-challenge.herokuapp.com/api/apps?take=5&skip=5&sortBy=title&direction=desc",
            {
              headers: {
                Authorization: "Bearer " + token
              }
            }
          )
        ])
        .then(
          axios.spread((...responses) => {
            let appNames = apps;
            setUser(responses[0].data);
            responses[1].data.data.forEach(el => {
              let data = [];
              el.chartData.forEach(element => {
                data.push([element.label, element.value]);
              });
              appNames.push(el.title);
              cards.push(
                <div
                  style={{
                    width: "49%",
                    float: "right",
                    marginRight: "2px",
                    marginBottom: "15px"
                  }}
                >
                  <AppCard
                    avatar="https://picsum.photos/50/50"
                    name={el.title}
                    totalUsers={el.totalUsers}
                    data={data}
                    android={el.platforms.android}
                    ios={el.platforms.ios}
                  />
                </div>
              );
            });
            setApps(appNames);
            setCard(cards);
          })
        )
        .catch(error => {
          console.log(error);
        });
    })();
  });
  const handlePrevPage = event => {
    setPage(page == 1 ? 1 : page - 1);
  };
  const handleNextPage = event => {
    const max = card && card.length ? card.length : cards.length;

    setPage(page == Math.ceil(max / 2) ? page : page + 1);
  };

  const handleLogOut = event => {
    cookie.set("token", null, { expires: new Date("1998/10/10") });
    cookie.set("username", null, { expires: new Date("1998/10/10") });
    router.push("/");
  };
  const handleClick = event => {
    setOverlayInput(true);
  };
  const handleSearch = event => {
    if (event.keyCode == 13) {
      let appNames = apps;
      appNames.filter(function(word, index) {
        let pattern = new RegExp(event.target.value, "g");
        if (word.match(pattern)) {
          setPage(Math.floor(index / 2 + 1));
          let cardd = card;
          setCard(cardd);

          return;
        } else {
        }
      });
    }
  };
  return (
    <div>
      <div style={{ marginBottom: "100px" }}>
        <NavBar
          avatar={userData.avatar}
          name={userData.name}
          plan={userData.plan}
          handleLogOut={handleLogOut}
          handleSearch={handleSearch}
        />
      </div>
      <div style={{ position: "relative", width: "60%", left: "20%" }}>
        {card
          ? card.slice((page - 1) * 2, (page - 1) * 2 + 2)
          : cards.slice((page - 1) * 2, (page - 1) * 2 + 2)}
        <div style={{ float: "right", width: "51%" }}>
          <IconButton
            aria-label="next"
            onClick={handleNextPage}
            style={{ float: "right" }}
          >
            <NavigateNextIcon />
          </IconButton>
          <IconButton
            aria-label="prev"
            onClick={handlePrevPage}
            style={{ float: "right" }}
          >
            <NavigateBeforeIcon name="prev" />
          </IconButton>
        </div>
      </div>
      {!overlayInput && (
        <Overlay show={overlayInput} handleClick={handleClick}></Overlay>
      )}
    </div>
  );
};
Dashboard.getInitialProps = async ({ query }) => {
  const { user } = query;
  return { user };
};

Dashboard.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  const { username } = nextCookie(ctx);
  return { token, username };
};
export default withRouter(Dashboard);
