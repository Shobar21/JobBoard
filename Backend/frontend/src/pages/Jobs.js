import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import login from '../imges/th.jpeg'
import search from '../imges/search.png'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 6
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          'http://localhost:8000/api/v1/job/get-job',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch jobs')
        }

        const data = await response.json()
        setJobs(data.jobs)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [token])

  const filteredJobs = jobs.filter((job) =>
    job.position.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  return (
    <Layout>
      <div className='container'>
        <Row>
          <Col>
            <h2 className='main-dash mt-5'>Latest Jobs</h2>
          </Col>
          <Col>
            <div className='search mt-3'>
              <input
                type='text'
                id='city-input'
                placeholder='Search by position'
                spellCheck='false'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button id='search-btn'>
                <img src={search} alt='search' />
              </button>
            </div>
          </Col>
          <Col className='text-end mt-3'>
            <img
              src={login}
              alt='User'
              className='rounded-circle avtar'
              width={35}
            />
          </Col>
        </Row>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <>
            <Row className='d-flex justify-content-between mt-2'>
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <Card
                    key={job._id}
                    className='mx-2'
                    style={{
                      width: '18rem',
                      marginBottom: '20px',
                      gap: '20px',
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{job.position}</Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {job.company}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Type:</strong> {job.workType} <br />
                        <strong>Status:</strong> {job.status} <br />
                        <strong>Location:</strong> {job.workLocation}
                      </Card.Text>
                      <div className='d-flex justify-content-between'>
                        <Button href='#' className='btns'>
                          Apply Now
                        </Button>
                        <Button href='#' className='btns'>
                          More Info
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <h1>No jobs available</h1>
              )}
            </Row>

            {/* 🔹 Pagination Buttons */}
            {filteredJobs.length > jobsPerPage && (
              <div className='d-flex justify-content-between mt-2'>
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='mx-2 btns'
                >
                  Previous
                </Button>
                {/* <span className='align-self-center'>
                  Page {currentPage} of {totalPages}
                </span> */}
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='mx-2 btns'
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

export default Jobs
