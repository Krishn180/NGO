import React, { useState, useEffect } from 'react';
import { Grid, Typography, Avatar, Rating, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from './header';
import "./Profile.css";

const Review = ({ reviewer, position, comment, rating }) => (
  <div style={{ overflow: 'hidden' }}>
    <Typography variant="body2" style={{ fontStyle: 'italic', marginBottom: '5px' }}>
      "{comment}" - <strong>{reviewer}</strong> ({position})
    </Typography>
    <Rating name="rating" value={rating} precision={0.5} readOnly />
    <hr style={{ margin: '10px 0' }} />
  </div>
);

const Profile = () => {
  const [data, setData] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isAddingReview, setIsAddingReview] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/user3');
        const jsonData = await response.json();
        setData(jsonData);
        setReviews(jsonData.reviews);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setData(null); 
      }
    };

    fetchData();
  }, []);
  if (!data) {
    return <div>No data to display</div>;
  }

  const handleRatingChange = (event) => {
    setNewRating(parseFloat(event.target.value));
  };

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleSubmitReview = () => {
    if (newRating > 0 && newReview.trim() !== '') {
      const newReviewObj = {
        reviewer: "You",
        position: "Reviewer",
        comment: newReview,
        rating: newRating
      };
      setReviews([...reviews, newReviewObj]);
      setNewRating(0);
      setNewReview('');
      setIsAddingReview(false);
    }
  };

  const handleAddReviewClick = () => {
    setIsAddingReview(true);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Header />
      <div className='Profile-info'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
          <Avatar sx={{ bgcolor: deepOrange[500], width: 250, height: 250, fontSize: 60, marginX: 'auto', marginTop: 2, marginBottom: 2, display: 'block' }} variant='square'>{data.name.charAt(0)}</Avatar>
            <Typography variant="h6">{data.name}</Typography>
            <Rating name="rating" value={data.rating} precision={0.5} readOnly />
            <Typography variant="body2">Based on {reviews.length} reviews</Typography>
            <Typography variant="body2">**Reviews:**</Typography>
            {reviews.map((review, index) => (
              <Review
                key={index}
                reviewer={review.reviewer}
                position={review.position}
                comment={review.comment}
                rating={review.rating}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Qualifications</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: 'lightgray' }}>
                <Typography variant="body1">
                  Education: {data.qualifications.education}<br />
                  Certifications: {data.qualifications.certifications}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Professional Experience</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: 'lightblue' }}>
                <Typography variant="body1">
                  Company: {data.professionalExperience.company}<br />
                  Job Title: {data.professionalExperience.jobTitle}<br />
                  Responsibilities: {data.professionalExperience.responsibilities}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Certifications</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: 'lightgreen' }}>
                <Typography variant="body1">
                  Certifications: {data.certifications.certifications}<br />
                  Licenses: {data.certifications.licenses}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Skills</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: 'lightcoral' }}>
                <Typography variant="body1">
                  Technical Skills: {data.skills.technicalSkills}<br />
                  Soft Skills: {data.skills.softSkills}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div style={{ marginTop: '20px' }}>
              {isAddingReview ? (
                <div>
                  <Rating name="newRating" value={newRating} precision={0.5} onChange={handleRatingChange} />
                  <TextField
                    label="Your Review"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={newReview}
                    onChange={handleReviewChange}
                    style={{ margin: '10px 0' }}
                  />
                  <Button variant="contained" onClick={handleSubmitReview}>Submit</Button>
                </div>
              ) : (
                <Typography variant="h6" onClick={handleAddReviewClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Add Your Review</Typography>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
