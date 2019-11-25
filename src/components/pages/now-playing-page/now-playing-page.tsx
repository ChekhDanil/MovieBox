import React from "react";
import { observer, inject } from "mobx-react";
import { RouteComponentProps } from "react-router-dom";

import "./now-playing-page.css";
import MovieGrid from "../../movie-grid/movie-grid";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";
import { IFilmsStore } from "../../../store/mobx-store-films";

interface MatchParams {
  page: string;
}

/** Review: лучше назови IProps */
interface MatchProps extends RouteComponentProps<MatchParams> {
  /** Review: По поводу опциональной сторы - был вопрос с подвохом) Пока известные только костыльные решения для данной
   * ситуации, поэтому использовать стору как не required - можно. Собственно это и есть одно из костыльных решений */
  filmsStore: IFilmsStore;
}

@inject("filmsStore")
@observer
class NowPlayingPage extends React.Component<MatchProps> {
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
    const { loading, films } = filmsStore;
    const { page } = match.params;
    if (loading) {
      return <Spinner />;
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
