import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import App from './App';

afterEach(() => {
  jest.useRealTimers();
})

test('renders app/navigation', () => {
  render(<App />);
  const metricsEle = screen.getByTestId("metrics");
  expect(metricsEle).toBeInTheDocument();
});

test('check render create metric modal', () => {
  render(<App />);
  const linkElement = screen.getByText(/CREATE METRIC/i);
  expect(linkElement).toBeInTheDocument();
  act(() => {
    fireEvent.click(linkElement);
  })
  const createMetricModalEle = screen.getByTestId("create-metric");
  expect(createMetricModalEle).toBeInTheDocument();
});

test('check create metric', async () => {
  jest.useFakeTimers();
  render(<App />);
  const linkElement = screen.getByText(/CREATE METRIC/i);
  act(() => {
    userEvent.click(linkElement);
  })
  const inputEle = screen.getByLabelText("Metric name");
  fireEvent.change(inputEle, { target: { value: 'test-metric' } });
  const saveEle = screen.getByText(/Save/i);
  act(() => {
    fireEvent.click(saveEle);
  })

  const cardEle = await waitFor(() => {
    return screen.getByTestId("metric-cards");
  }, { timeout: 3000 });

  expect(cardEle).toBeInTheDocument();
});


