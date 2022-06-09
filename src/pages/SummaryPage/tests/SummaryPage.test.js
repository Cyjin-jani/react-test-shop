import SummaryPage from '../SummaryPage';
import { render, screen } from '../../../test-util';

test('checkbox and button', () => {
  render(<SummaryPage />);
  const checkbox = screen.getByRole('checkbox', {
    name: '주문내역을 확인하셨나요?',
  });
  expect(checkbox.checked).toEqual(false);

  const confirmBtn = screen.getByRole('button', { name: '주문 확인' });
  expect(confirmBtn.disabled).toBeTruthy();
});
