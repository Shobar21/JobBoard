import React from 'react'
import Layout from '../components/layout/Layout'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import login from '../imges/th.jpeg'
import search from '../imges/search.png'

function Dashboard() {
  const users = [
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Smith', email: 'bob@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' },
    { name: 'David Wilson', email: 'david@example.com' },
    { name: 'Emma Davis', email: 'emma@example.com' },
  ]

  const jobData = [
    { position: 'Assistant Professor', company: 'Eabox', status: 'Interview' },
    { position: 'Design Engineer', company: 'Devpulse', status: 'Reject' },
    { position: 'Compensation Analyst', company: 'Mita', status: 'Interview' },
    { position: 'Software Developer', company: 'TechCorp', status: 'Pending' },
    { position: 'Marketing Specialist', company: 'BizWorld', status: 'reject' },
  ]

  return (
    <Layout>
      <div className='container'>
        <Row>
          <Col>
            <h2 className='main-dash mt-5'>Dashboard</h2>
          </Col>
          {/* <Col>
            <div class='search mt-3'>
              <input
                type='text'
                id='city-input'
                placeholder='Enter here'
                spellcheck='false'
              />
              <button id='search-btn'>
                <img src={search} alt='search' />
              </button>
            </div>
          </Col> */}
          <Col className='text-end mt-3'>
            <img
              src={login}
              alt='User'
              className='rounded-circle avtar'
              width={35}
            />
          </Col>
        </Row>
        <Row className='my-4 row-product'>
          <Col className='col-product'>
            <Card className='p-3 cards'>
              <div className='details d-flex'>
                <div className='info'>
                  <h5 className='product-h5'>Total Jobs </h5>
                  <h3 className='product-h3'>1000</h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col className='col-product'>
            <Card className='p-3 cards'>
              <div className='details d-flex'>
                <div className='info'>
                  <h5 className='product-h5'>Total candidates</h5>
                  <h3 className='product-h3'>200</h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col className='col-product'>
            <Card className='p-3 cards'>
              <div className='details d-flex'>
                <div className='info'>
                  <div className=' d-flex product-sale '>
                    <h5 className='product-h5 solds'> Positions</h5>
                  </div>
                  <h3 className='product-h3 numb'>10</h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col className='col-product'>
            <Card className='p-3 cards'>
              <div className='details d-flex'>
                <div className='info'>
                  <h5 className='product-h5'>Total Companies</h5>
                  <h3 className='product-h3'>60</h3>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <div className='container mt-4'>
            <h2 className='fw-bold text-dark'>Contact Table</h2>
            <table className='table'>
              <thead>
                <tr className='text-muted fw-semibold'>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} style={{ borderBottom: 'none' }}>
                    <td className='fw-semibold'>{user.name}</td>
                    <td>{jobData[index].position}</td>
                    <td>{jobData[index].company}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          jobData[index].status === 'Pending'
                            ? 'bg-warning'
                            : jobData[index].status === 'Interview'
                            ? 'bg-info'
                            : 'bg-danger'
                        }`}
                      >
                        {jobData[index].status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row>
      </div>
    </Layout>
  )
}

export default Dashboard
