import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetail.scss';
import DoctorSchedule from './DoctorSchedule';
import { Container } from 'react-bootstrap';
import { getDetailInfoDoctorService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorExtraInfor from './DoctorExtraInfor';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctorService(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                    currentDoctorId: id
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { detailDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} | ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn} | ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        let language = this.props.language;
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left">
                            <div className="img" style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}></div>
                        </div>
                        <div className="content-right">
                            <div className="title-doctor">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="content-doctor">
                                {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.description &&
                                    <span>
                                        {detailDoctor.MarkDown.description}
                                    </span>}
                            </div>
                        </div>
                    </div>

                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId} />
                        </div>
                    </div>

                    <div className="detail-info-doctor">
                        {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.MarkDown.contentHTML }}></div>}
                    </div>
                    <div className="comment-doctor">

                    </div>
                </div>
            </ >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
