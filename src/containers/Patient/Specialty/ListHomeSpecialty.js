import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../../store/actions';
import './ListHomeSpecialty.scss';
import { getAllSpecialty, deleteSpecialtyById } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router';


class ListHomeSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
        }
    }

    async componentDidMount() {
        this.fetchSpecialtys()
    }

    fetchSpecialtys = async () => {
        let res = await getAllSpecialty();
        if (res.errCode === 0 && res.data) {
            this.setState({
                specialties: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        this.fetchSpecialtys();
    }

    handleDeleteSpecialty = async (id) => {
        let confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa 'Chuyên khoa' với ID '" + id + "' không?");

        if (confirmDelete) {
            try {
                await deleteSpecialtyById(id);
                this.fetchSpecialtys(); // Cập nhật danh sách specialties sau khi xóa
                toast.success('Specialty deleted successfully!')
            } catch (error) {
                toast.error('Error deleted!')
            }
        }
    }

    handleRedirectDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {
        const { specialties } = this.state;

        return (
            <div className='s-container'>
                <div className='s-body'>
                    <div className="s-header">
                        <i onClick={() => this.props.history.push(`/home`)} class="fas fa-arrow-left"></i> Chuyên khoa
                    </div>
                    {specialties.map((item, index) => (
                        <div className="content" key={item.id}>
                            <td className='i-img' onClick={() => this.handleRedirectDetailSpecialty(item)}>
                                {item.image && (
                                    <img className='img' src={item.image} alt={item.name} />
                                )}
                            </td>
                            <td onClick={() => this.handleRedirectDetailSpecialty(item)}
                                className='i-name'>{item.name}</td>
                        </div>
                    ))}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListHomeSpecialty));
