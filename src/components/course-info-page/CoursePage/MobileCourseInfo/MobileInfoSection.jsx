/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  HowToReg,
  Language,
  Verified,
  PostOutline,
  WatchFilled,
  Event,
  Record,
  InfoOutline,
} from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import { getLangName } from '../../../../utils/transcriptLang';
import messages from '../../../../messages';

const MobileInfoSection = ({ courseMetaData, instructors, intl }) => (
  <div id="info-course" className="pt-3.5 pb-4.5">
    <p>{courseMetaData?.additional_metadata?.short_description}</p>
    <div className="mobile-icons-wrapper mt-4 font-sm">
      {courseMetaData?.additional_metadata?.language && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="mr-2" src={Language} />
          <span>
            {getLangName(courseMetaData?.additional_metadata?.language)}
          </span>
        </div>
      )}
      {courseMetaData?.transcript_langs
        && courseMetaData?.transcript_langs.length > 0 && (
          <div className="d-flex align-items-start mb-2">
            <Icon className="mr-2" src={PostOutline} />
            <span className="course-tooltip">
              {courseMetaData?.transcript_langs
                && courseMetaData?.transcript_langs?.map((transLang) => (
                  <span key={transLang}>{getLangName(transLang)}</span>
                ))}
            </span>
          </div>
      )}
      <div className="d-flex align-items-start mb-2">
        <Icon className="mr-2" src={HowToReg} />
        {courseMetaData?.additional_metadata?.self_paced ? (
          <FormattedMessage
            id="courseInfo.selfPaced.text"
            defaultMessage="Self Paced"
          />
        ) : (
          <FormattedMessage
            id="courseInfo.instructorPaced.text"
            defaultMessage="Instructor Paced"
          />
        )}
      </div>
      {courseMetaData?.additional_metadata?.certificate_enabled && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="mr-2" src={Verified} />
          <FormattedMessage
            id="courseInfo.verifiedCertificate.text"
            defaultMessage="Verified certificate"
          />
        </div>
      )}
      {instructors?.length > 0 && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="mr-2" src={Record} />
          <p className="program-instructors-wrapper">
            {instructors?.map((ins) => (
              <Link
                key={ins.name}
                className="instructor-title"
                to={`/instructor/${ins.slug}`}
              >
                {ins.name}
              </Link>
            ))}
          </p>
        </div>
      )}
      {courseMetaData?.additional_metadata?.enrollment_start && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="mr-2" src={Event} />
          <p>
            <span className="color-black mr-1">
              <FormattedMessage
                id="courseInfo.registrationStarDate.text"
                defaultMessage="Registration start date"
              />
            </span>
            <span>
              (
              <FormattedDate
                value={courseMetaData?.additional_metadata?.enrollment_start}
                day="numeric"
                month="long"
                year="numeric"
              />
              )
            </span>
          </p>
        </div>
      )}
      {courseMetaData?.additional_metadata?.enrollment_end && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="mr-2" src={Event} />
          <p>
            <span className="color-black mr-1">
              <FormattedMessage
                id="courseInfo.registrationEndDate.text"
                defaultMessage="Registration end date"
              />
            </span>
            <span>
              (
              <FormattedDate
                value={courseMetaData?.additional_metadata?.enrollment_end}
                day="numeric"
                month="long"
                year="numeric"
              />
              )
            </span>
          </p>
        </div>
      )}
      {courseMetaData?.additional_metadata?.course_start && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon mr-2" src={Event} />
          <p>
            <span className="color-black mr-1">
              <FormattedMessage
                id="courseInfo.starting.text"
                defaultMessage="Starting"
              />
            </span>
            <span>
              (
              <FormattedDate
                value={courseMetaData?.additional_metadata?.course_start}
                day="numeric"
                month="long"
                year="numeric"
              />
              )
            </span>
          </p>
        </div>
      )}
      {courseMetaData?.additional_metadata?.course_end && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon mr-2" src={Event} />
          <p>
            <span className="color-black mr-1">
              <FormattedMessage
                id="courseInfo.ending.text"
                defaultMessage="Ending"
              />
            </span>
            <span>
              (
              <FormattedDate
                value={courseMetaData?.additional_metadata?.course_end}
                day="numeric"
                month="long"
                year="numeric"
              />
              )
            </span>
          </p>
        </div>
      )}
      {courseMetaData?.total_weeks_of_effort > 0 && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon mr-2" src={WatchFilled} />
          <p className="color-black">
            <span className="mr-1">
              <FormattedMessage
                id="courseCard.weeks.text"
                defaultMessage="{weekCount, number} {weekCount, plural, one {Week} other {Weeks}}"
                values={{
                  weekCount: courseMetaData?.total_weeks_of_effort,
                }}
              />
            </span>
            {courseMetaData?.hours_effort_per_week_min
              && courseMetaData?.hours_effort_per_week_max && (
                <span className="text-gray-700">
                  (
                  <FormattedNumber
                    value={courseMetaData?.hours_effort_per_week_min}
                  />
                  -
                  <FormattedNumber
                    value={courseMetaData?.hours_effort_per_week_max}
                  />{' '}
                  {intl.formatMessage(messages['courseCard.hoursPerWeek.text'])}
                  )
                </span>
            )}
          </p>
        </div>
      )}
      {courseMetaData?.additional_metadata?.total_enrollments && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon mr-2" src={InfoOutline} />
          {courseMetaData?.additional_metadata?.total_enrollments && (
            <p>
              <span className="mr-1">
                <FormattedNumber
                  value={courseMetaData?.additional_metadata?.total_enrollments}
                />
              </span>
              <span className="font-sm">
                <FormattedMessage
                  id="courseInfo.alreadyEnrolled.text"
                  defaultMessage="already enrolled!"
                />
              </span>{' '}
            </p>
          )}
        </div>
      )}
      {courseMetaData?.additional_metadata?.last_modification_date && (
        <p className="d-flex align-items-start mb-2">
          <Icon className="card-icon mr-2" src={Event} />
          <span className="mr-1">
            <FormattedMessage
              id="courseInfo.lastUpdateOn.text"
              defaultMessage="Last update on"
            />
          </span>
          <span>
            <FormattedDate
              value={
                courseMetaData?.additional_metadata?.last_modification_date
              }
              day="numeric"
              month="long"
              year="numeric"
            />
          </span>
        </p>
      )}
    </div>
  </div>
);

export default injectIntl(MobileInfoSection);
