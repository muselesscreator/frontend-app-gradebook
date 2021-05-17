/* eslint-disable react/sort-comp, react/button-has-type, import/no-named-as-default */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
} from '@edx/paragon';

import selectors from 'data/selectors';
import actions from 'data/actions';
import PercentGroup from '../PercentGroup';

export class CourseGradeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleApplyClick = this.handleApplyClick.bind(this);
    this.handleUpdateMin = this.handleUpdateMin.bind(this);
    this.handleUpdateMax = this.handleUpdateMax.bind(this);
    this.updateCourseGradeFilters = this.updateCourseGradeFilters.bind(this);
  }

  handleApplyClick() {
    const { courseGradeMin, courseGradeMax } = this.props.filterValues;
    const isMinValid = this.isGradeFilterValueInRange(courseGradeMin);
    const isMaxValid = this.isGradeFilterValueInRange(courseGradeMax);

    this.props.setFilters({
      isMinCourseGradeFilterValid: isMinValid,
      isMaxCourseGradeFilterValid: isMaxValid,
    });

    if (isMinValid && isMaxValid) {
      this.updateCourseGradeFilters();
    }
  }

  updateCourseGradeFilters() {
    const { courseGradeMin, courseGradeMax } = this.props.filterValues;
    this.props.updateFilter({
      courseGradeMin,
      courseGradeMax,
      courseId: this.props.courseId,
    });
    this.props.getUserGrades(
      this.props.courseId,
      this.props.selectedCohort,
      this.props.selectedTrack,
      this.props.selectedAssignmentType,
      { courseGradeMin, courseGradeMax },
    );
    this.props.updateQueryParams({ courseGradeMin, courseGradeMax });
  }

  handleUpdateMin(event) {
    this.props.setFilters({ courseGradeMin: event.target.value });
  }

  handleUpdateMax(event) {
    this.props.setFilters({ courseGradeMax: event.target.value });
  }

  isGradeFilterValueInRange = (value) => {
    const valueAsInt = parseInt(value, 10);
    return valueAsInt >= 0 && valueAsInt <= 100;
  };

  render() {
    return (
      <>
        <div className="grade-filter-inputs">
          <PercentGroup
            id="minimum-grade"
            label="Min Grade"
            value={this.props.filterValues.courseGradeMin}
            onChange={this.handleUpdateMin}
          />
          <PercentGroup
            id="maximum-grade"
            label="Max Grade"
            value={this.props.filterValues.courseGradeMax}
            onChange={this.handleUpdateMax}
          />
        </div>
        <div className="grade-filter-action">
          <Button
            variant="outline-secondary"
            onClick={this.handleApplyClick}
          >
            Apply
          </Button>
        </div>
      </>
    );
  }
}

CourseGradeFilter.defaultProps = {
  courseId: '',
  selectedAssignmentType: '',
  selectedCohort: null,
  selectedTrack: null,
};

CourseGradeFilter.propTypes = {
  courseId: PropTypes.string,
  filterValues: PropTypes.shape({
    courseGradeMin: PropTypes.string.isRequired,
    courseGradeMax: PropTypes.string.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  updateQueryParams: PropTypes.func.isRequired,

  // Redux
  getUserGrades: PropTypes.func.isRequired,
  selectedAssignmentType: PropTypes.string,
  selectedCohort: PropTypes.string,
  selectedTrack: PropTypes.string,
  updateFilter: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => {
  const { filters } = selectors;
  return {
    selectedCohort: filters.cohort(state),
    selectedTrack: filters.track(state),
    selectedAssignmentType: filters.assignmentType(state),
  };
};

export const mapDispatchToProps = {
  updateFilter: actions.filter.update.courseGrade,
  getUserGrades: fetchGrades,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseGradeFilter);
