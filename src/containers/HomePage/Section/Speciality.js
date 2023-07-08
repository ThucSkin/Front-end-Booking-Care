import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class Speciality extends Component {


    render() {

        return (
            <div className="section-share section-speciality">
                <div className="section-container">
                    <div className="section-header">
                        <span>Chuyên khoa phổ biến</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className='slider-customize'>
                                <div className="bg-image img-speciality"></div>
                                <div className='text'>Cơ xương khớp</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-speciality"></div>
                                <div className='text'>Cơ xương khớp</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-speciality"></div>
                                <div className='text'>Cơ xương khớp</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-speciality"></div>
                                <div className='text'>Cơ xương khớp</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-speciality"></div>
                                <div className='text'>Cơ xương khớp</div>
                            </div>
                            <div className='slider-customize'>
                                <div className="bg-image img-speciality"></div>
                                <div className='text'>Cơ xương khớp</div>
                            </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
