import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import { getScheduleByDate } from '../../../services/userService';
import '../../../styles/styles.scss';
import { FormattedMessage } from 'react-intl';
import BookingModal from './modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTimes: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        });
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTimes: res.data ? res.data : []
            });
        }
    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTimes: res.data ? res.data : []
            });
        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value;
            let res = await getScheduleByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTimes: res.data ? res.data : [],
                });
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        });
    }

    closeBooking = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    }

    render() {
        let { allDays, allAvalableTimes, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        const hasAvailableTimes = allAvalableTimes && allAvalableTimes.length > 0;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.value}>
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calenda">
                            <i className='fas fa-calendar-alt'><span><FormattedMessage id={"detail-doctor.calendar"} /></span></i>
                        </div>
                        <div className="time-content">
                            {allAvalableTimes && allAvalableTimes.length > 0 ?
                                allAvalableTimes.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ?
                                        item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button onClick={() => this.handleClickScheduleTime(item)} key={index}>{timeDisplay}</button>
                                    )
                                })
                                :
                                <div className="text-content"><FormattedMessage id={"detail-doctor.text"} /></div>
                            }
                        </div>
                        {hasAvailableTimes && (
                            <div className="note">Chọn <i className="far fa-hand-point-up fa-lg"></i> và đặt (Phí đặt lịch 0<sup>đ</sup>)</div>
                        )}
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBooking={this.closeBooking}
                    dataTime={dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
