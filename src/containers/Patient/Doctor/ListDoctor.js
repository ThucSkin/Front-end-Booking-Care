import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ListDoctor.scss';
import { getAllDoctorsService } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';


class ListDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
        }
    }

    async componentDidMount() {
        this.fetchDoctors()
    }

    fetchDoctors = async () => {
        let res = await getAllDoctorsService();
        if (res.errCode === 0 && res.data) {
            this.setState({
                doctors: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        this.fetchDoctors();
    }

    handleRedirectDetailDoctor = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${item.id}`)
        }
    }

    render() {
        const { doctors } = this.state;
        let { language } = this.props;

        return (
            <div className='d-container'>
                <div className='d-body'>
                    <div className="d-header">
                        <i onClick={() => this.props.history.push(`/home`)} class="fas fa-arrow-left"></i> Bác sĩ
                    </div>
                    <div className="search-doctor">
                        <input type="text" placeholder='Tìm kiếm bác sĩ' />
                    </div>
                    <div className="title-name">Bác sĩ nổi bật</div>
                    {doctors.map(item => {
                        const doctorVi = language === LANGUAGES.VI
                            ? item.positionData.valueVi
                            : item.positionData.valueEn;
                        const nameVi = language === LANGUAGES.VI
                            ? item.lastName + ' ' + item.firstName : item.firstName + ' ' + item.lastName

                        return (
                            <div className="content" key={item.id}
                                onClick={() => this.handleRedirectDetailDoctor(item)}>
                                <div className="i-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                                <div className="content-right">
                                    <label className="">{doctorVi} || {nameVi}</label>
                                    <label className='clinic-name'>{item.Doctor_Infor.specialtyTypeData.name}</label>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allRequireDoctorInfor: state.admin.allRequireDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDoctor));
