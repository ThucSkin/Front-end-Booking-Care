import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            });
        }
    }

    hanldeViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        console.log('data', arrDoctors);
        let { language } = this.props;
        return (
            <div className="section-share section-outstandingdoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span>Bác sĩ nổi bật tuần qua</span>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi} | ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.valueEn} | ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className='slider-customize slider-doctor' onClick={() => this.hanldeViewDetailDoctor(item)}>
                                            <div className="bg-image img-outstandingdoctor"
                                                style={{ backgroundImage: `url(${imageBase64})` }}>
                                            </div>
                                            <div className='text'>
                                                <div className="">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div className="">{item.Doctor_Infor.specialtyTypeData.name}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor))
