/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';

import { messages } from 'data/constants/app';
import { BulkManagementTab } from '.';
import BulkManagementAlerts from './BulkManagementAlerts';
import FileUploadForm from './FileUploadForm';
import HistoryTable from './HistoryTable';

jest.mock('./BulkManagementAlerts', () => 'BulkManagementAlerts');
jest.mock('./FileUploadForm', () => 'FileUploadForm');
jest.mock('./HistoryTable', () => 'HistoryTable');

describe('BulkManagementTab', () => {
  describe('component', () => {
    let el;
    beforeEach(() => {
      el = shallow(<BulkManagementTab />);
    });
    describe('snapshot', () => {
      const snapshotSegments = [
        'heading from messages.BulkManagementTab.heading',
        '<BulkManagementAlerts />',
        '<FileUploadForm />',
        '<HistoryTable />',
      ];
      test(`snapshot - loads ${snapshotSegments.join(', ')}`, () => {
        expect(el).toMatchSnapshot();
      });
      test('heading - h4 loaded from messages', () => {
        const heading = el.find('h4');
        expect(heading.text()).toEqual(messages.BulkManagementTab.heading);
      });
      test('heading, then alerts, then upload form, then table', () => {
        expect(el.childAt(0).is('h4')).toEqual(true);
        expect(el.childAt(1).is(BulkManagementAlerts)).toEqual(true);
        expect(el.childAt(2).is(FileUploadForm)).toEqual(true);
        expect(el.childAt(3).is(HistoryTable)).toEqual(true);
      });
    });
  });
});
