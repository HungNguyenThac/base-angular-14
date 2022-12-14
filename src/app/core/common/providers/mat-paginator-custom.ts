import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MultiLanguageService } from "@app/share/translate";

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = "Item per page";
  override firstPageLabel = "First page";
  override lastPageLabel = "Last page";
  override nextPageLabel = "Next page";
  override previousPageLabel = "Previous page";

  constructor(private translate: MultiLanguageService) {
    super();
    this.translateLabels();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant("mat_paginator_intl.page_per_total_label", {
        page: 1,
        total: 1,
      });
    }
    length = Math.max(length, 0);
    // const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    // const endIndex =
    //   startIndex < length
    //     ? Math.min(startIndex + pageSize, length)
    //     : startIndex + pageSize;
    const totalPage = Math.ceil(length / pageSize);

    return this.translate.instant("mat_paginator_intl.page_per_total_label", {
      page: page + 1,
      total: totalPage,
    });
  };

  injectTranslateService(translate: MultiLanguageService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant(
      "mat_paginator_intl.items_per_page"
    );
    this.firstPageLabel = this.translate.instant(
      "mat_paginator_intl.first_page"
    );
    this.lastPageLabel = this.translate.instant("mat_paginator_intl.last_page");
    this.nextPageLabel = this.translate.instant("mat_paginator_intl.next_page");
    this.previousPageLabel = this.translate.instant(
      "mat_paginator_intl.previous_page"
    );
  }
}
