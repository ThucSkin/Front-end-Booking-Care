import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetail.scss';
import DoctorSchedule from './DoctorSchedule';
import { Container } from 'react-bootstrap';
import { getDetailInfoDoctorService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorExtraInfor from './DoctorExtraInfor';

class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        return (
            <>

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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
