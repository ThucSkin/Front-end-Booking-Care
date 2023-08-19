import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ListClinic.scss';
import { getAllClinic } from '../../../services/userService';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';
import HomeHeader from '../../HomePage/HomeHeader'

class ListClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
        }
    }

    async componentDidMount() {
        this.fetchClinics()
    }

    fetchClinics = async () => {
        let res = await getAllClinic();
        if (res.errCode === 0 && res.data) {
            this.setState({
                clinics: res.data, // Cập nhật mảng clinics trong state
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        this.fetchClinics();

    }

    hanldeViewDetailClinic = (clinicId) => {
        this.props.history.push(`/detail-clinic/${clinicId.id}`)
    }

    render() {
        const { clinics } = this.state;

        return (
            <>
                <HomeHeader />
                <Container>
                    <div className="c-header">
                        <label>Cơ sở y tế</label>
                        <div className="c-h-right">
                            <div className="btn-province">Tỉnh thành</div>
                            <div className="btn-search">
                                <input type='text' placeholder='Tìm kiếm' />
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        {clinics.map((item, index) => (
                            <div className='col-md-3 slider-customize '>
                                <div key={item.id} onClick={() => this.hanldeViewDetailClinic(item)}>
                                    <div className="bg-image img-medical-facility"
                                        style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className='text text-center'>{item.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container >
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListClinic);
