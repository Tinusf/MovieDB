import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/UnfoldMore";
import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { setSearchSettings, setView } from "../store/actions/MovieActions";
import ArrowBack from "@material-ui/icons/ArrowBack";
/*

Should be a part of the grid display of movies

*/

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#f44336"
    }
  }
});

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menu: {
    display: "flex"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    width: "250px",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  backButton: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    marginTop: "4px"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  sortMenu: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  sortButton: {
    color: "white"
  },
  sortIcon: {
    color: "white"
  }
});

class MovieSearch extends React.Component {
  state = {
    anchorEl: null,
    searchText: "",
    pagenr: 0,
    asc: false,
    ordering: "vote_count"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = sortBy => {
    this.setState({ anchorEl: null });
    this.setState({ ordering: sortBy });
  };

  handleChangeSorting = ascBool => {
    this.setState({ asc: ascBool });
  };

  componentDidUpdate(prevProps, prevState) {
    this.props.dispatch(setSearchSettings(this.state.searchText, this.state.asc, this.state.pagenr, this.state.ordering));

    // Hvis du alt var på movieView siden og så endrer du søkefelt eller sorteringen så vil både forrige props og propsen nå være movieview og vi kan gå tilbake til moviegridden.
    if (prevProps.viewName === this.props.viewName && this.props.viewName === "movieview") {
      this.goback();
    }
  }

  goback = () => {
    this.props.dispatch(setView("moviegrid"));
  }

  componentDidMount() {
    this.props.dispatch(setSearchSettings("", false, 0, "vote_count"));
  }

  render() {
    const { classes, viewName } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar position="static">
        <Toolbar className={classes.menu} >
          <Button color="inherit" onClick={e => this.goback()}>
            <Typography variant="h6" className={classes.title} color="inherit">
              Movie database
            </Typography>
          </Button>
          {viewName && this.props.viewName !== "moviegrid" && (
            <Button className={classes.backButton} onClick={e => this.goback()}>
              <ArrowBack style={{ color: "white" }} />
            </Button>
          )}

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              className="searchInputField"
              onChange={event => {
                this.setState({ searchText: event.target.value });
                // this.sendInput(searchText => event.target.value);
              }}
            />
          </div>
          <div className={classes.sortMenu}>
            <Button className={classes.sortButton + " sortButton"} aria-owns={anchorEl ? "sort-menu" : undefined} aria-haspopup="true" onClick={this.handleClick}>
              Sort By
            </Button>
            <Menu id="sort-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
              <MenuItem onClick={() => this.handleClose("adult")} className="sortAdult">Adult</MenuItem>
              <MenuItem onClick={() => this.handleClose("title")} className="sortTitle">Alphabetical</MenuItem>
              <MenuItem onClick={() => this.handleClose("budget")} className="sortBudget">Budget</MenuItem>
              <MenuItem onClick={() => this.handleClose("popularity")} className="sortPopularity">Popularity</MenuItem>
              <MenuItem onClick={() => this.handleClose("release_date")} className="sortDate">Release Date</MenuItem>
              <MenuItem onClick={() => this.handleClose("revenue")} className="sortRevenue">Revenue</MenuItem>
            </Menu>
            <Button className={classes.sortIcon + " sortIcon"} onClick={() => this.handleChangeSorting(!this.state.asc)}>
              <SortIcon />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(state => ({ viewName: state.movies.viewName }))(withStyles(styles)(MovieSearch));
