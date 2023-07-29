import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';
import Speciality from './Section/Speciality';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.language;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className='fas fa-bars'></i>
                            <div onClick={() => this.props.history.push(`/home`)} className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.searchdoctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.Health facilities" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.Choose hospital clinic" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.Doctor" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.choose a good doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.Checkup package" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.General health check Support" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className='fas fa-question-circle'><FormattedMessage id="home-header.Support" /></i>
                                <p>024-7301-2468</p>
                            </div>
                            <div className={language === LANGUAGES.VI ?
                                'language-vi active' : 'language-vi'} >
                                <span onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>
                                    VN
                                </span>
                            </div>
                            <div className={language === LANGUAGES.EN ?
                                'language-en active' : 'language-en'} >
                                <span onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                    {this.props.isShowBanner === true &&
                        <div className="home-header-banner">
                            <div className="content-up">
                                <div className="title1">
                                    NỀN TẢNG Y TẾ
                                </div>
                                <div className="title2">
                                    CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                                </div>
                                <div className="search">
                                    <i className='fas fa-search'></i>
                                    <input type="text" placeholder='Tìm chuyên khoa' />
                                </div>
                            </div>
                            <div className="content-down">
                                <div className="options">
                                    <div className="options-child">
                                        <div className="icon-chuyen-khoa"></div>
                                        <div className="text-child">Khám chuyên khoa</div>
                                    </div>
                                    <div className="options-child">
                                        <div className="icon-kham-tu-xa"></div>
                                        <div className="text-child">Khám từ xa</div>
                                    </div>
                                    <div className="options-child">
                                        <div className="icon-kham-tong-quat"></div>
                                        <div className="text-child">Khám tổng quát</div>
                                    </div>
                                    <div className="options-child">
                                        <div className="icon-xet-nghiem-y-hoc"></div>
                                        <div className="text-child">Xét nghiệm y học</div>
                                    </div>
                                    <div className="options-child">
                                        <div className="icon-suc-khoe-tinh-than"></div>
                                        <div className="text-child">Sức khỏe tinh thần</div>
                                    </div>
                                </div>
                                <div className="options">
                                    <div className="options-child">
                                        <div className="icon-kham-nha-khoa"></div>
                                        <div className="text-child">Khám nha khoa</div>
                                    </div>
                                    <div className="options-child">
                                        <div className="icon-goi-phau-thuat"></div>
                                        <div className="text-child">Gói phẫu thuật</div>
                                    </div>
                                    <div className="options-child">
                                        <div className="icon-san-pham-y-te"></div>
                                        <div className="text-child">Sản phẩm y tế</div>
                                    </div>
                                    <div className="options-child">
                                        <div className="icon-bai-test-suc-khoe"></div>
                                        <div className="text-child">Bài Test sức khỏe</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: language => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
