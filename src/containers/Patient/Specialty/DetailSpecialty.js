import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [12, 2]
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    detailDoctor = (id) => {
        this.props.history.push(`/detail-doctor/${id}`)
    }

    render() {
        let { arrDoctorId } = this.state;

        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className="description-specialty">

                </div>
                {
                    arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => {
                        return (
                            <Container>
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowAddressDoctor={false}
                                            />
                                            <div className="see-more" onClick={() => this.detailDoctor(item)}>
                                                <FormattedMessage id={"detail-specialty.see-more"} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                                key={index}
                                            />
                                        </div>
                                        <div className="doctor-extraInfor">
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        )
                    })
                }
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
