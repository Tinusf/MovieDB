import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import SortIcon from "@material-ui/icons/UnfoldMore";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { setSearchSettings, setView } from "../store/actions/MovieActions";
import ArrowBack from "@material-ui/icons/ArrowBack";
/*

Topbaren som inneholder tilbakeknappen, søkefeltet og sortering.

*/

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

  // Når sort by dropdown menyen lukkes. enten fordi du trykker på et element i dropdown menyen eller fordi du klikker på utsiden av.
  handleClose = sortBy => {
    this.setState({ anchorEl: null });
    // Hvis du trykker utenfor dropdown menyen så blir sortBy et objekt, og det blir mye tull om du prøver å sette ordering til det. 
    if (typeof sortBy === 'string' || sortBy instanceof String) {
      this.setState({ ordering: sortBy });
    }
  };

  // Endre hvilken vei du vil sortere dataen.
  handleChangeSorting = ascBool => {
    this.setState({ asc: ascBool });
  };

  // Når du oppdaterer enten søketekst, sorteringen eller noe sånn så blir staten endret, da vil denne funksjonen bli kjørt.
  componentDidUpdate(prevProps, prevState) {
    // Kjører da setSearchSettings som bruker redux og kjører et query for å hente ut filmer fra databasen.
    this.props.dispatch(setSearchSettings(this.state.searchText, this.state.asc, this.state.pagenr, this.state.ordering));

    // Hvis du alt var på movieView siden og så endrer du søkefelt eller sorteringen så vil både forrige props og propsen nå være movieview og vi kan gå tilbake til moviegridden.
    if (prevProps.viewName === this.props.viewName && this.props.viewName === "movieview") {
      this.goback();
    }
  }

  goback = () => {
    this.props.dispatch(setView("moviegrid"));
  };

  componentDidMount() {
    // Default søket vårt. Bare så vi har noen fine filmer når du loader siden for første gang.
    this.props.dispatch(setSearchSettings("", false, 0, "vote_count"));
  }

  render() {
    const { classes, viewName } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar position="static">
        <Toolbar className={classes.menu}>
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
