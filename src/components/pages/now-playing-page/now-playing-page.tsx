import React from "react";
import { observer, inject } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";

import "./now-playing-page.css";
import MovieGrid from "../../movie-grid/movie-grid";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";
import { IFilmsStore } from "../../../store/mobx-store-films";

interface MatchParams {
  page: string;
}

interface Iprops extends RouteComponentProps<MatchParams> {
  filmsStore: IFilmsStore;
}

@inject("filmsStore")
@observer
class NowPlayingPage extends React.Component<Iprops> {
  componentDidMount() {
    const { match, filmsStore } = this.props;
    const { page } = match.params;
    filmsStore.fetchFilms(Number(page) || 1);
  }

  changePage = (e: { selected: number }) => {
    const { history, filmsStore } = this.props;
    const { selected }: { selected: number } = e;
    const page: number = selected + 1;

    history.push(`/page/${page}`);
    filmsStore.fetchFilms(page);
  };

  render() {
    const { match, filmsStore } = this.props;
    const { films, loading, error } = filmsStore;
    const { page } = match.params;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      toast.error("Cannot load Films", { position: "bottom-right" });
      return (
        <>
          <AppHeader />
          <h1 className="error_text">Error while load films</h1>
        </>
      );
    }
    return (
      <>
        <AppHeader />
        <MovieGrid films={films!.results} />
        <Pagination
          initialPage={Number(page) || 1}
          pageCount={films!.totalPages}
          changePage={this.changePage}
        />
      </>
    );
  }
}

export default NowPlayingPage;
