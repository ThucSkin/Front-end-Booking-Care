import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        });
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInforDoctor(this.props.doctorId);
        }
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            return (
                <>
                    <div className='time'>{time} | {date}</div>
                    <div className="">Mien phi dat lich</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, isShowAddressDoctor, dataTime } = this.props;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} | ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} | ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        console.log('check data time', this.props.dataTime)
        return (
            <>
                <div className="intro-doctor">
                    <div className="content-left">
                        <div className="img" style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}></div>
                    </div>
                    <div className="content-right">
                        <div className="title-doctor">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="content-doctor">
                            {isShowDescriptionDoctor === true ?
                                <>
                                    {dataProfile && dataProfile.MarkDown && dataProfile.MarkDown.description &&
                                        <span>
                                            {dataProfile.MarkDown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                        {isShowAddressDoctor === true ?
                            <div className="address-price">
                                <div className="address">
                                    <label><FormattedMessage id={"detail-doctor.address"} />: <span>&nbsp;</span></label>
                                    {dataProfile && dataProfile.Doctor_Infor
                                        ? dataProfile.Doctor_Infor.addressClinic : ''}
                                </div>
                                <div className="price">
                                    <label><FormattedMessage id={"detail-doctor.price"} />: <span>&nbsp;</span></label>
                                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
                                        ? dataProfile.Doctor_Infor.priceTypeData.valueVi + 'VND' : ''}
                                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                                        ? dataProfile.Doctor_Infor.priceTypeData.valueEn + '$' : ''}
                                </div>
                            </div>
                            : ''
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
