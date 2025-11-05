<?php
namespace App\Repositories;

class ChickensRepo extends BaseRepo {
	protected string $collection = 'chickens';

	/**
	 * Search chickens by name (case-insensitive partial match). Limit default to 50.
	 */
	public function search(string $q, int $limit = 50): array {
		$filter = [];
		$q = trim($q);
		if ($q !== '') {
			$filter['name'] = ['$regex' => $q, '$options' => 'i'];
		}
		return $this->find($filter, ['sort' => ['_id' => -1], 'limit' => $limit]);
	}
}