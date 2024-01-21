/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DesktopUnenrollAlert from './UnenrollAlert/DesktopUnenrollAlert';
import { useUnenrollCourse } from '../../../../../hooks/useUnenrollCourse';
import { hideUnenrollAlert } from '../../../../../redux/slice/course/unenrollAlert';

const BottomSheetUnenrollAlert = React.lazy(() => import('./UnenrollAlert/BottomSheetUnenrollAlert'));

const UnenrollAlert = ({ courseId }) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const { handleUnenroll } = useUnenrollCourse(courseId);
  const visibleCourseId = useSelector(
    (state) => state.unenrollAlert.visibleCourseId,
  );

  const onClose = () => dispatch(hideUnenrollAlert());
  return (
    <>
      {isMobile ? (
        <BottomSheetUnenrollAlert
          handleUnenroll={handleUnenroll}
          onClose={onClose}
          visibleCourseId={visibleCourseId}
          courseId={courseId}
        />
      ) : (
        <DesktopUnenrollAlert
          handleUnenroll={handleUnenroll}
          onClose={onClose}
          visibleCourseId={visibleCourseId}
          courseId={courseId}
        />
      )}
    </>
  );
};

export default UnenrollAlert;
