import React, { Component } from 'react';
import { withRouter } from 'react-router';
import draftToHtml from 'draftjs-to-html';
import callApi from '../../../util/apiCaller';

import AdminHeader from '../../Admin/components/AdminHeader';
import PasswordBeforeEdit from '../components/PasswordBeforeEdit';
import s from './ListDetailPage.css';
import sSkill from '../components/ListItem.css';

import { getToken } from '../../Admin/authToken';

// import HeaderText from '../components/HeaderText';

class ListDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: null,
      err: null,
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    const { pathname } = this.props.location;
    const isAdmin = pathname.indexOf('/admin/request/') >= 0;
    if (!isAdmin) {
      callApi(`/list/${id}`, 'get').then((res, err) => {
        if (err) {
          this.setState({ err });
        } else {
          const list = res.list;
          if (list) {
            this.setState({ list });
          } else {
            this.setState({ err: 'List not found.' });
          }
        }
      });
    } else {
      const token = getToken();
      if (!token) {
        alert('No token.');
        return;
      }
      callApi(`/requests/${id}?token=${token}`, 'get').then((res, err) => {
        if (err) {
          this.setState({ err });
        } else {
          const list = res.data;
          if (list) {
            this.setState({ list });
          } else {
            this.setState({ err: 'List not found.' });
          }
        }
      });
    }
  }

  renderList(list) {
    const {
      company_image,
      company_name,
      company_location,
      skills,
      salary,
      details,
      how_to_apply,
    } = list;

    const Tags = skills.map((skill, i) => <span className={sSkill.skill} key={i}>{skill}</span>);

    const Location = `${company_location.city}, ${company_location.city}`;
    const Salary = salary.max === 9999999 ? 'Unspecified.' : `${salary.min} - ${salary.max} B`;

    return (
      <div className={s.detailWrapper}>
        <div className={s['image-wrapper']}>
          <img src={company_image} alt={`${company_name}'s logo`} className={s.image} />
        </div>
        <div>
          <p>Company: <strong>{company_name}</strong></p>
        </div>

        <div>
          <p>Location: {Location}</p>
        </div>

        <div>
          <p>Sklls: {Tags}</p>
        </div>

        <div>
          <p>Salary: {Salary}</p>
          {/*
            FOR AUNNNNN
            if company didn't insert salary detail i made default min, max salary to 0 and 9999999 respectively (for analytic purpose). So if you need to check whether company has specified salary or not you need to check max salary is equal to 9999999 or not.
          */}
        </div>

        <div>
          <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(details)) }} />
        </div>

        <div>
          <strong>How to apply</strong>
          <p>{how_to_apply}</p>
        </div>
      </div>
    );
  }

  render() {
    const { list, err } = this.state;
    if (!list) {
      return (
        <div className="container">
          <p>{err || 'Loading...'}</p>
        </div>
      );
    }

    const { location: { pathname }, params: { id } } = this.props;
    const isAdmin = pathname.indexOf('/admin/request/') >= 0;
    return (
      <div className="container">
        {isAdmin ?
          <AdminHeader list={list} /> : ''
        }
        {this.renderList(list)}
        {!isAdmin &&
          <PasswordBeforeEdit list_id={id} />
        }
      </div>
    );
  }
}

ListDetailPage.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default withRouter(ListDetailPage);
