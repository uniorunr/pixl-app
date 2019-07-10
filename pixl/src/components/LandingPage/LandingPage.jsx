import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RedactorImg from '../../assets/pixl.png';
import PiggyImg from '../../assets/piggy.gif';
import RssImg from '../../assets/RSS.gif';
import KittyImg from '../../assets/kitty.gif';
import './LandingPage.scss';
import * as actions from '../../actions/actions';

class LandingPage extends Component {
  goToApp = () => {
    const { changeSection } = this.props;
    changeSection();
    sessionStorage.setItem('section', 'app');
  };

  render() {
    return (
      <Fragment>
        <main className="landing-page">
          <div className="landing-page__content">
            <div className="landing-page__left-section">
              <div className="landing-page__description">
                <h2>PIXL! - Pixel Art Tool</h2>
                <p>
                  Create animation in just one step. Almost all kind of tools
                  for drawing, Frame management, Layer management, Primary and
                  secondary color, Configurable canvas, Preview, Export to GIF
                  and much more.
                </p>
              </div>
              <div className="landing-page__redactor-screenshot">
                <img src={RedactorImg} alt="Redactor screenshot" />
              </div>
            </div>
            <div className="landing-page__right-section">
              <div className="landing-page__examples-section">
                <h3>Examples</h3>
                <p>
                  Here are some of the examples of animations that were created
                  in this app.
                </p>
                <div className="landing-page__example">
                  <img src={PiggyImg} alt="gif example" />
                  <img src={RssImg} alt="gif example" />
                  <img src={KittyImg} alt="gif example" />
                </div>
              </div>
              <button
                type="button"
                className="landing-page__main-button"
                onClick={this.goToApp}
              >
                <span>Go to app</span>
              </button>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="footer__content">
            <p>
              Developed with
              <span className="footer__heart" role="img" aria-label="red heart">
                ❤️
              </span>
              by
              <a
                href="https://github.com/uniorunr"
                target="_blank"
                rel="noopener noreferrer"
              >
                uniorunr
              </a>
            </p>
          </div>
        </footer>
      </Fragment>
    );
  }
}

LandingPage.propTypes = {
  changeSection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  section: state.section,
});

const mapDispatchToProps = (dispatch) => {
  const { changeSection } = bindActionCreators(actions, dispatch);
  return {
    changeSection: () => {
      changeSection('app');
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
