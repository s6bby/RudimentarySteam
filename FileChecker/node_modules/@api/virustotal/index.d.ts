import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Get an IP address report
     *
     * @throws FetchError<400, types.IpInfoResponse400> 400
     */
    ipInfo(metadata: types.IpInfoMetadataParam): Promise<FetchResponse<200, types.IpInfoResponse200>>;
    /**
     * Reanalyse an IP address already in VirusTotal
     *
     * @summary Request an IP address rescan (re-analyze)
     * @throws FetchError<400, types.RescanIpResponse400> 400
     */
    rescanIp(metadata: types.RescanIpMetadataParam): Promise<FetchResponse<200, types.RescanIpResponse200>>;
    /**
     * Get comments on an IP address
     *
     * @throws FetchError<400, types.IpCommentsGetResponse400> 400
     */
    ipCommentsGet(metadata: types.IpCommentsGetMetadataParam): Promise<FetchResponse<200, types.IpCommentsGetResponse200>>;
    /**
     * Add a comment to an IP address
     *
     * @throws FetchError<400, types.IpCommentsPostResponse400> 400
     */
    ipCommentsPost(body: types.IpCommentsPostBodyParam, metadata: types.IpCommentsPostMetadataParam): Promise<FetchResponse<200, types.IpCommentsPostResponse200>>;
    ipCommentsPost(metadata: types.IpCommentsPostMetadataParam): Promise<FetchResponse<200, types.IpCommentsPostResponse200>>;
    /**
     * Get objects related to an IP address
     *
     * @throws FetchError<400, types.IpRelationshipsResponse400> 400
     */
    ipRelationships(metadata: types.IpRelationshipsMetadataParam): Promise<FetchResponse<200, types.IpRelationshipsResponse200>>;
    /**
     * Get object descriptors related to an IP address
     *
     * @throws FetchError<400, types.IpRelationshipsIdsResponse400> 400
     */
    ipRelationshipsIds(metadata: types.IpRelationshipsIdsMetadataParam): Promise<FetchResponse<200, types.IpRelationshipsIdsResponse200>>;
    /**
     * Get votes on an IP address
     *
     * @throws FetchError<400, types.IpVotesResponse400> 400
     */
    ipVotes(metadata: types.IpVotesMetadataParam): Promise<FetchResponse<200, types.IpVotesResponse200>>;
    /**
     * Add a vote to an IP address
     *
     * @throws FetchError<400, types.IpVotesPostResponse400> 400
     * @throws FetchError<409, types.IpVotesPostResponse409> 409
     */
    ipVotesPost(body: types.IpVotesPostBodyParam, metadata: types.IpVotesPostMetadataParam): Promise<FetchResponse<200, types.IpVotesPostResponse200>>;
    /**
     * Get a domain report
     *
     * @throws FetchError<400, types.DomainInfoResponse400> 400
     */
    domainInfo(metadata: types.DomainInfoMetadataParam): Promise<FetchResponse<200, types.DomainInfoResponse200>>;
    /**
     * Reanalyse a domain already in VirusTotal
     *
     * @summary Request an domain rescan (re-analyze)
     * @throws FetchError<400, types.DomainsRescanResponse400> 400
     */
    domainsRescan(metadata: types.DomainsRescanMetadataParam): Promise<FetchResponse<200, types.DomainsRescanResponse200>>;
    /**
     * Get comments on a domain
     *
     * @throws FetchError<400, types.DomainsCommentsGetResponse400> 400
     */
    domainsCommentsGet(metadata: types.DomainsCommentsGetMetadataParam): Promise<FetchResponse<200, types.DomainsCommentsGetResponse200>>;
    /**
     * Add a comment to a domain
     *
     * @throws FetchError<400, types.DomainsCommentsPostResponse400> 400
     */
    domainsCommentsPost(body: types.DomainsCommentsPostBodyParam, metadata: types.DomainsCommentsPostMetadataParam): Promise<FetchResponse<200, types.DomainsCommentsPostResponse200>>;
    domainsCommentsPost(metadata: types.DomainsCommentsPostMetadataParam): Promise<FetchResponse<200, types.DomainsCommentsPostResponse200>>;
    /**
     * Get objects related to a domain
     *
     * @throws FetchError<400, types.DomainsRelationshipsResponse400> 400
     */
    domainsRelationships(metadata: types.DomainsRelationshipsMetadataParam): Promise<FetchResponse<200, types.DomainsRelationshipsResponse200>>;
    /**
     * Get object descriptors related to a domain
     *
     * @throws FetchError<400, types.DomainsRelationshipsIdsResponse400> 400
     */
    domainsRelationshipsIds(metadata: types.DomainsRelationshipsIdsMetadataParam): Promise<FetchResponse<200, types.DomainsRelationshipsIdsResponse200>>;
    /**
     * Get a DNS resolution object
     *
     * @throws FetchError<400, types.GetResolutionByIdResponse400> 400
     */
    getResolutionById(metadata: types.GetResolutionByIdMetadataParam): Promise<FetchResponse<200, types.GetResolutionByIdResponse200>>;
    /**
     * Get votes on a domain
     *
     * @throws FetchError<400, types.DomainsVotesGetResponse400> 400
     */
    domainsVotesGet(metadata: types.DomainsVotesGetMetadataParam): Promise<FetchResponse<200, types.DomainsVotesGetResponse200>>;
    /**
     * Add a vote to a domain
     *
     * @throws FetchError<400, types.DomainVotesPostResponse400> 400
     * @throws FetchError<409, types.DomainVotesPostResponse409> 409
     */
    domainVotesPost(body: types.DomainVotesPostBodyParam, metadata: types.DomainVotesPostMetadataParam): Promise<FetchResponse<200, types.DomainVotesPostResponse200>>;
    /**
     * Get a URL for uploading files larger than 32MB
     *
     * @summary Get a URL for uploading large files
     * @throws FetchError<400, types.FilesUploadUrlResponse400> 400
     */
    filesUploadUrl(metadata: types.FilesUploadUrlMetadataParam): Promise<FetchResponse<200, types.FilesUploadUrlResponse200>>;
    /**
     * Retrieve information about a file
     *
     * @summary Get a file report
     * @throws FetchError<400, types.FileInfoResponse400> 400
     */
    fileInfo(metadata: types.FileInfoMetadataParam): Promise<FetchResponse<200, types.FileInfoResponse200>>;
    /**
     * Reanalyse a file already in VirusTotal
     *
     * @summary Request a file rescan (re-analyze)
     * @throws FetchError<400, types.FilesAnalyseResponse400> 400
     */
    filesAnalyse(metadata: types.FilesAnalyseMetadataParam): Promise<FetchResponse<200, types.FilesAnalyseResponse200>>;
    /**
     * Get a file’s download URL
     *
     * @throws FetchError<400, types.FilesDownloadUrlResponse400> 400
     */
    filesDownloadUrl(metadata: types.FilesDownloadUrlMetadataParam): Promise<FetchResponse<200, types.FilesDownloadUrlResponse200>>;
    /**
     * Download a file
     *
     * @throws FetchError<400, types.FilesDownloadResponse400> 400
     */
    filesDownload(metadata: types.FilesDownloadMetadataParam): Promise<FetchResponse<200, types.FilesDownloadResponse200>>;
    /**
     * Get comments on a file
     *
     * @throws FetchError<400, types.FilesCommentsGetResponse400> 400
     */
    filesCommentsGet(metadata: types.FilesCommentsGetMetadataParam): Promise<FetchResponse<200, types.FilesCommentsGetResponse200>>;
    /**
     * Add a comment to a file
     *
     * @throws FetchError<400, types.FilesCommentsPostResponse400> 400
     */
    filesCommentsPost(body: types.FilesCommentsPostBodyParam, metadata: types.FilesCommentsPostMetadataParam): Promise<FetchResponse<200, types.FilesCommentsPostResponse200>>;
    /**
     * Get objects related to a file
     *
     * @throws FetchError<400, types.FilesRelationshipsResponse400> 400
     */
    filesRelationships(metadata: types.FilesRelationshipsMetadataParam): Promise<FetchResponse<200, types.FilesRelationshipsResponse200>>;
    /**
     * Get object descriptors related to a file
     *
     * @throws FetchError<400, types.FilesRelationshipsIdsResponse400> 400
     */
    filesRelationshipsIds(metadata: types.FilesRelationshipsIdsMetadataParam): Promise<FetchResponse<200, types.FilesRelationshipsIdsResponse200>>;
    /**
     * Get a crowdsourced Sigma rule object
     *
     * @throws FetchError<400, types.GetSigmaRulesResponse400> 400
     */
    getSigmaRules(metadata: types.GetSigmaRulesMetadataParam): Promise<FetchResponse<200, types.GetSigmaRulesResponse200>>;
    /**
     * Yara Ruleset used in our crowdsourced YARA results.
     *
     * @summary Get a crowdsourced YARA ruleset
     * @throws FetchError<400, types.GetYaraRulesetsResponse400> 400
     */
    getYaraRulesets(metadata: types.GetYaraRulesetsMetadataParam): Promise<FetchResponse<200, types.GetYaraRulesetsResponse200>>;
    /**
     * Get votes on a file
     *
     * @throws FetchError<400, types.FilesVotesGetResponse400> 400
     */
    filesVotesGet(metadata: types.FilesVotesGetMetadataParam): Promise<FetchResponse<200, types.FilesVotesGetResponse200>>;
    /**
     * Add a vote on a file
     *
     * @throws FetchError<400, types.FilesVotesPostResponse400> 400
     * @throws FetchError<409, types.FilesVotesPostResponse409> 409
     */
    filesVotesPost(body: types.FilesVotesPostBodyParam, metadata: types.FilesVotesPostMetadataParam): Promise<FetchResponse<200, types.FilesVotesPostResponse200>>;
    /**
     * Get a summary of all behavior reports for a file
     *
     * @throws FetchError<400, types.FileAllBehavioursSummaryResponse400> 400
     */
    fileAllBehavioursSummary(metadata: types.FileAllBehavioursSummaryMetadataParam): Promise<FetchResponse<200, types.FileAllBehavioursSummaryResponse200>>;
    /**
     * Get a summary of all MITRE ATT&CK techniques observed in a file
     *
     * @throws FetchError<400, types.GetASummaryOfAllMitreAttckTechniquesObservedInAFileResponse400> 400
     */
    getASummaryOfAllMitreAttckTechniquesObservedInAFile(metadata: types.GetASummaryOfAllMitreAttckTechniquesObservedInAFileMetadataParam): Promise<FetchResponse<200, types.GetASummaryOfAllMitreAttckTechniquesObservedInAFileResponse200>>;
    /**
     * Get all behavior reports for a file
     *
     * @throws FetchError<400, types.GetAllBehaviorReportsForAFileResponse400> 400
     */
    getAllBehaviorReportsForAFile(metadata: types.GetAllBehaviorReportsForAFileMetadataParam): Promise<FetchResponse<200, types.GetAllBehaviorReportsForAFileResponse200>>;
    /**
     * Get a file behavior report from a sandbox
     *
     * @throws FetchError<400, types.GetFileBehaviourIdResponse400> 400
     */
    getFileBehaviourId(metadata: types.GetFileBehaviourIdMetadataParam): Promise<FetchResponse<200, types.GetFileBehaviourIdResponse200>>;
    /**
     * Get objects related to a behaviour report
     *
     * @throws FetchError<400, types.GetFileBehavioursRelationshipResponse400> 400
     */
    getFileBehavioursRelationship(metadata: types.GetFileBehavioursRelationshipMetadataParam): Promise<FetchResponse<200, types.GetFileBehavioursRelationshipResponse200>>;
    /**
     * Get object descriptors related to a behaviour report
     *
     * @throws FetchError<400, types.GetFileBehavioursRelationshipDescriptorResponse400> 400
     */
    getFileBehavioursRelationshipDescriptor(metadata: types.GetFileBehavioursRelationshipDescriptorMetadataParam): Promise<FetchResponse<200, types.GetFileBehavioursRelationshipDescriptorResponse200>>;
    /**
     * HTML sandbox report
     *
     * @summary Get a detailed HTML behaviour report
     * @throws FetchError<400, types.GetFileBehavioursHtmlResponse400> 400
     */
    getFileBehavioursHtml(metadata: types.GetFileBehavioursHtmlMetadataParam): Promise<FetchResponse<200, types.GetFileBehavioursHtmlResponse200>>;
    /**
     * Get the EVTX file generated during a file’s behavior analysis
     *
     * @throws FetchError<400, types.GetFileBehavioursEvtxResponse400> 400
     */
    getFileBehavioursEvtx(metadata: types.GetFileBehavioursEvtxMetadataParam): Promise<FetchResponse<200, types.GetFileBehavioursEvtxResponse200>>;
    /**
     * Get the PCAP file generated during a file’s behavior analysis
     *
     * @throws FetchError<400, types.GetFileBehavioursPcapResponse400> 400
     */
    getFileBehavioursPcap(metadata: types.GetFileBehavioursPcapMetadataParam): Promise<FetchResponse<200, types.GetFileBehavioursPcapResponse200>>;
    /**
     * Get the memdump file generated during a file’s behavior analysis
     *
     * @throws FetchError<400, types.GetFileBehavioursMemdumpResponse400> 400
     */
    getFileBehavioursMemdump(metadata: types.GetFileBehavioursMemdumpMetadataParam): Promise<FetchResponse<200, types.GetFileBehavioursMemdumpResponse200>>;
    /**
     * Get a URL report
     *
     * @throws FetchError<400, types.UrlInfoResponse400> 400
     */
    urlInfo(metadata: types.UrlInfoMetadataParam): Promise<FetchResponse<200, types.UrlInfoResponse200>>;
    /**
     * Request a URL rescan (re-analyze)
     *
     * @throws FetchError<400, types.UrlsAnalyseResponse400> 400
     */
    urlsAnalyse(metadata: types.UrlsAnalyseMetadataParam): Promise<FetchResponse<200, types.UrlsAnalyseResponse200>>;
    /**
     * Get comments on a URL
     *
     * @throws FetchError<400, types.UrlsCommentsGetResponse400> 400
     */
    urlsCommentsGet(metadata: types.UrlsCommentsGetMetadataParam): Promise<FetchResponse<200, types.UrlsCommentsGetResponse200>>;
    /**
     * Add a comment on a URL
     *
     * @throws FetchError<400, types.UrlsCommentsPostResponse400> 400
     */
    urlsCommentsPost(body: types.UrlsCommentsPostBodyParam, metadata: types.UrlsCommentsPostMetadataParam): Promise<FetchResponse<200, types.UrlsCommentsPostResponse200>>;
    /**
     * Get objects related to a URL
     *
     * @throws FetchError<400, types.UrlsRelationshipsResponse400> 400
     */
    urlsRelationships(metadata: types.UrlsRelationshipsMetadataParam): Promise<FetchResponse<200, types.UrlsRelationshipsResponse200>>;
    /**
     * Get object descriptors related to a URL
     *
     * @throws FetchError<400, types.UrlsRelationshipsIdsResponse400> 400
     */
    urlsRelationshipsIds(metadata: types.UrlsRelationshipsIdsMetadataParam): Promise<FetchResponse<200, types.UrlsRelationshipsIdsResponse200>>;
    /**
     * Get votes on a URL
     *
     * @throws FetchError<400, types.UrlsVotesGetResponse400> 400
     */
    urlsVotesGet(metadata: types.UrlsVotesGetMetadataParam): Promise<FetchResponse<200, types.UrlsVotesGetResponse200>>;
    /**
     * Add a vote on a URL
     *
     * @throws FetchError<400, types.UrlsVotesPostResponse400> 400
     * @throws FetchError<409, types.UrlsVotesPostResponse409> 409
     */
    urlsVotesPost(body: types.UrlsVotesPostBodyParam, metadata: types.UrlsVotesPostMetadataParam): Promise<FetchResponse<200, types.UrlsVotesPostResponse200>>;
    /**
     * Get latest comments
     *
     * @throws FetchError<400, types.GetCommentsResponse400> 400
     */
    getComments(metadata: types.GetCommentsMetadataParam): Promise<FetchResponse<200, types.GetCommentsResponse200>>;
    /**
     * Get a comment object
     *
     * @throws FetchError<400, types.GetCommentResponse400> 400
     */
    getComment(metadata: types.GetCommentMetadataParam): Promise<FetchResponse<200, types.GetCommentResponse200>>;
    /**
     * Delete a comment
     *
     * @throws FetchError<400, types.CommentIdDeleteResponse400> 400
     */
    commentIdDelete(metadata: types.CommentIdDeleteMetadataParam): Promise<FetchResponse<200, types.CommentIdDeleteResponse200>>;
    /**
     * Get objects related to a comment
     *
     */
    commentsRelationships(metadata: types.CommentsRelationshipsMetadataParam): Promise<FetchResponse<200, types.CommentsRelationshipsResponse200>>;
    /**
     * Get object descriptors related to a comment
     *
     * @throws FetchError<400, types.CommentsRelationshipsIdsResponse400> 400
     */
    commentsRelationshipsIds(metadata: types.CommentsRelationshipsIdsMetadataParam): Promise<FetchResponse<200, types.CommentsRelationshipsIdsResponse200>>;
    /**
     * Add a vote to a comment
     *
     * @throws FetchError<400, types.VoteCommentResponse400> 400
     */
    voteComment(body: types.VoteCommentBodyParam, metadata: types.VoteCommentMetadataParam): Promise<FetchResponse<200, types.VoteCommentResponse200>>;
    /**
     * Get a URL / file analysis
     *
     * @throws FetchError<400, types.AnalysisResponse400> 400
     */
    analysis(metadata: types.AnalysisMetadataParam): Promise<FetchResponse<200, types.AnalysisResponse200>>;
    /**
     * Get objects related to an analysis
     *
     * @throws FetchError<400, types.AnalysesGetObjectsResponse400> 400
     */
    analysesGetObjects(metadata: types.AnalysesGetObjectsMetadataParam): Promise<FetchResponse<200, types.AnalysesGetObjectsResponse200>>;
    /**
     * Get object descriptors related to an analysis
     *
     * @throws FetchError<400, types.AnalysesGetDescriptorsResponse400> 400
     */
    analysesGetDescriptors(metadata: types.AnalysesGetDescriptorsMetadataParam): Promise<FetchResponse<200, types.AnalysesGetDescriptorsResponse200>>;
    /**
     * Get a submission object
     *
     * @throws FetchError<400, types.GetSubmissionResponse400> 400
     */
    getSubmission(metadata: types.GetSubmissionMetadataParam): Promise<FetchResponse<200, types.GetSubmissionResponse200>>;
    /**
     * Get an operation object
     *
     * @throws FetchError<400, types.GetOperationsIdResponse400> 400
     */
    getOperationsId(metadata: types.GetOperationsIdMetadataParam): Promise<FetchResponse<200, types.GetOperationsIdResponse200>>;
    /**
     * Get a Whois object
     *
     * @throws FetchError<400, types.WhoisidResponse400> 400
     */
    whoisid(metadata: types.WhoisidMetadataParam): Promise<FetchResponse<200, types.WhoisidResponse200>>;
    /**
     * Get a SSL Certificate object
     *
     * @throws FetchError<400, types.SslCertsidResponse400> 400
     */
    ssl_certsid(metadata: types.SslCertsidMetadataParam): Promise<FetchResponse<200, types.SslCertsidResponse200>>;
    /**
     * Get an attack tactic object
     *
     * @throws FetchError<400, types.GetAttackTacticsResponse400> 400
     */
    getAttackTactics(metadata: types.GetAttackTacticsMetadataParam): Promise<FetchResponse<200, types.GetAttackTacticsResponse200>>;
    /**
     * Get objects related to an attack tactic
     *
     * @throws FetchError<400, types.GetAttackTacticsRelationshipResponse400> 400
     */
    getAttackTacticsRelationship(metadata: types.GetAttackTacticsRelationshipMetadataParam): Promise<FetchResponse<200, types.GetAttackTacticsRelationshipResponse200>>;
    /**
     * Get object descriptors related to an attack tactic
     *
     * @throws FetchError<400, types.GetAttackTacticsRelationshipDescriptorResponse400> 400
     */
    getAttackTacticsRelationshipDescriptor(metadata: types.GetAttackTacticsRelationshipDescriptorMetadataParam): Promise<FetchResponse<200, types.GetAttackTacticsRelationshipDescriptorResponse200>>;
    /**
     * Get an attack technique object
     *
     * @throws FetchError<400, types.GetAttackTechniquesResponse400> 400
     */
    getAttackTechniques(metadata: types.GetAttackTechniquesMetadataParam): Promise<FetchResponse<200, types.GetAttackTechniquesResponse200>>;
    /**
     * Get objects related to an attack technique
     *
     * @throws FetchError<400, types.GetAttackTechniquesRelationshipResponse400> 400
     */
    getAttackTechniquesRelationship(metadata: types.GetAttackTechniquesRelationshipMetadataParam): Promise<FetchResponse<200, types.GetAttackTechniquesRelationshipResponse200>>;
    /**
     * Get object descriptors related to an attack technique
     *
     * @throws FetchError<400, types.GetAttackTechniquesRelationshipDescriptorResponse400> 400
     */
    getAttackTechniquesRelationshipDescriptor(metadata: types.GetAttackTechniquesRelationshipDescriptorMetadataParam): Promise<FetchResponse<200, types.GetAttackTechniquesRelationshipDescriptorResponse200>>;
    /**
     * Get a list of popular threat categories
     *
     * @throws FetchError<400, types.GetPopularThreatCategoriesResponse400> 400
     */
    getPopularThreatCategories(metadata: types.GetPopularThreatCategoriesMetadataParam): Promise<FetchResponse<200, types.GetPopularThreatCategoriesResponse200>>;
    /**
     * Analyse code blocks with Code Insights
     *
     * @throws FetchError<400, types.AnalyseBinaryResponse400> 400
     */
    analyseBinary(body: types.AnalyseBinaryBodyParam, metadata: types.AnalyseBinaryMetadataParam): Promise<FetchResponse<200, types.AnalyseBinaryResponse200>>;
    /**
     * List Saved Searches
     *
     * @throws FetchError<400, types.ListSavedSearchesResponse400> 400
     */
    listSavedSearches(metadata: types.ListSavedSearchesMetadataParam): Promise<FetchResponse<200, types.ListSavedSearchesResponse200>>;
    /**
     * Create a Saved Search
     *
     * @throws FetchError<400, types.CreateSavedSearchesResponse400> 400
     */
    createSavedSearches(body: types.CreateSavedSearchesBodyParam, metadata: types.CreateSavedSearchesMetadataParam): Promise<FetchResponse<200, types.CreateSavedSearchesResponse200>>;
    /**
     * Get a Saved Search
     *
     * @throws FetchError<400, types.GetSavedSearchesResponse400> 400
     */
    getSavedSearches(metadata: types.GetSavedSearchesMetadataParam): Promise<FetchResponse<200, types.GetSavedSearchesResponse200>>;
    /**
     * Update a Saved Search
     *
     * @throws FetchError<400, types.UpdateSavedSearchesResponse400> 400
     */
    updateSavedSearches(body: types.UpdateSavedSearchesBodyParam, metadata: types.UpdateSavedSearchesMetadataParam): Promise<FetchResponse<200, types.UpdateSavedSearchesResponse200>>;
    /**
     * Delete a Saved Search
     *
     * @throws FetchError<400, types.DeleteSavedSearchesResponse400> 400
     */
    deleteSavedSearches(metadata: types.DeleteSavedSearchesMetadataParam): Promise<FetchResponse<200, types.DeleteSavedSearchesResponse200>>;
    /**
     * Share a Saved Search
     *
     * @throws FetchError<400, types.ShareSavedSearchesResponse400> 400
     */
    shareSavedSearches(body: types.ShareSavedSearchesBodyParam, metadata: types.ShareSavedSearchesMetadataParam): Promise<FetchResponse<200, types.ShareSavedSearchesResponse200>>;
    /**
     * Revoke access to a Saved Search
     *
     * @throws FetchError<400, types.RevokeSavedSearchesAccessResponse400> 400
     */
    revokeSavedSearchesAccess(body: types.RevokeSavedSearchesAccessBodyParam, metadata: types.RevokeSavedSearchesAccessMetadataParam): Promise<FetchResponse<200, types.RevokeSavedSearchesAccessResponse200>>;
    /**
     * Get object descriptors related to a Saved Search
     *
     * @throws FetchError<400, types.GetSavedSearchesRelatedDescriptorsResponse400> 400
     */
    getSavedSearchesRelatedDescriptors(metadata: types.GetSavedSearchesRelatedDescriptorsMetadataParam): Promise<FetchResponse<200, types.GetSavedSearchesRelatedDescriptorsResponse200>>;
    /**
     * Get objects related to a Saved Search
     *
     * @throws FetchError<400, types.GetSavedSearchesRelationshipsResponse400> 400
     */
    getSavedSearchesRelationships(metadata: types.GetSavedSearchesRelationshipsMetadataParam): Promise<FetchResponse<200, types.GetSavedSearchesRelationshipsResponse200>>;
    /**
     * Search for files, URLs, domains, IPs and comments
     *
     * @throws FetchError<400, types.ApiSearchResponse400> 400
     */
    apiSearch(metadata: types.ApiSearchMetadataParam): Promise<FetchResponse<200, types.ApiSearchResponse200>>;
    /**
     * Get VirusTotal metadata
     *
     * @throws FetchError<400, types.MetadataResponse400> 400
     */
    metadata(metadata: types.MetadataMetadataParam): Promise<FetchResponse<200, types.MetadataResponse200>>;
    /**
     * Create a new collection
     *
     * @throws FetchError<400, types.CollectionsCreateResponse400> 400
     */
    collectionsCreate(body: types.CollectionsCreateBodyParam, metadata: types.CollectionsCreateMetadataParam): Promise<FetchResponse<200, types.CollectionsCreateResponse200>>;
    /**
     * 🔒 List collections
     *
     * @throws FetchError<400, types.ListCollectionsResponse400> 400
     */
    listCollections(metadata: types.ListCollectionsMetadataParam): Promise<FetchResponse<200, types.ListCollectionsResponse200>>;
    /**
     * Get a collection
     *
     * @throws FetchError<400, types.CollectionsGetResponse400> 400
     */
    collectionsGet(metadata: types.CollectionsGetMetadataParam): Promise<FetchResponse<200, types.CollectionsGetResponse200>>;
    /**
     * Update a collection
     *
     * @throws FetchError<400, types.CollectionsUpdateResponse400> 400
     */
    collectionsUpdate(body: types.CollectionsUpdateBodyParam, metadata: types.CollectionsUpdateMetadataParam): Promise<FetchResponse<200, types.CollectionsUpdateResponse200>>;
    /**
     * Delete a collection
     *
     * @throws FetchError<400, types.CollectionsDeleteResponse400> 400
     */
    collectionsDelete(metadata: types.CollectionsDeleteMetadataParam): Promise<FetchResponse<200, types.CollectionsDeleteResponse200>>;
    /**
     * Get comments on a collection
     *
     * @throws FetchError<400, types.CollectionsCommentsResponse400> 400
     */
    collectionsComments(metadata: types.CollectionsCommentsMetadataParam): Promise<FetchResponse<200, types.CollectionsCommentsResponse200>>;
    /**
     * Add a comment to a collection
     *
     * @throws FetchError<400, types.CollectionsCommentsCreateResponse400> 400
     */
    collectionsCommentsCreate(body: types.CollectionsCommentsCreateBodyParam, metadata: types.CollectionsCommentsCreateMetadataParam): Promise<FetchResponse<200, types.CollectionsCommentsCreateResponse200>>;
    /**
     * Get objects related to a collection
     *
     * @throws FetchError<400, types.GetCollectionsRelationshipResponse400> 400
     */
    getCollectionsRelationship(metadata: types.GetCollectionsRelationshipMetadataParam): Promise<FetchResponse<200, types.GetCollectionsRelationshipResponse200>>;
    /**
     * Add new items to a collection
     *
     * @throws FetchError<400, types.CollectionsAddElementResponse400> 400
     */
    collectionsAddElement(body: types.CollectionsAddElementBodyParam, metadata: types.CollectionsAddElementMetadataParam): Promise<FetchResponse<200, types.CollectionsAddElementResponse200>>;
    /**
     * Delete items from a collection
     *
     * @throws FetchError<400, types.CollectionsDeleteElementResponse400> 400
     */
    collectionsDeleteElement(body: types.CollectionsDeleteElementBodyParam, metadata: types.CollectionsDeleteElementMetadataParam): Promise<FetchResponse<200, types.CollectionsDeleteElementResponse200>>;
    /**
     * Get object descriptors related to a collection
     *
     * @throws FetchError<400, types.GetCollectionsRelationshipDescriptorResponse400> 400
     */
    getCollectionsRelationshipDescriptor(metadata: types.GetCollectionsRelationshipDescriptorMetadataParam): Promise<FetchResponse<200, types.GetCollectionsRelationshipDescriptorResponse200>>;
    /**
     * 🔒 Export IOCs from a collection
     *
     * @throws FetchError<400, types.CollectionsExportIocsResponse400> 400
     */
    collectionsExportIocs(metadata: types.CollectionsExportIocsMetadataParam): Promise<FetchResponse<200, types.CollectionsExportIocsResponse200>>;
    /**
     * 🔒 Export IOCs from a given collection's relationship
     *
     * @throws FetchError<400, types.CollectionsExportIocsRelationshipResponse400> 400
     */
    collectionsExportIocsRelationship(metadata: types.CollectionsExportIocsRelationshipMetadataParam): Promise<FetchResponse<200, types.CollectionsExportIocsRelationshipResponse200>>;
    /**
     * 🔒 Export aggregations from a collection
     *
     * @throws FetchError<400, types.CollectionsExportAggregationsResponse400> 400
     */
    collectionsExportAggregations(metadata: types.CollectionsExportAggregationsMetadataParam): Promise<FetchResponse<200, types.CollectionsExportAggregationsResponse200>>;
    /**
     * 🔒 Search IoCs inside a collection
     *
     */
    searchIocsInsideACollection(metadata: types.SearchIocsInsideACollectionMetadataParam): Promise<FetchResponse<200, types.SearchIocsInsideACollectionResponse200>>;
    /**
     * Get the subscription preferences for a collection
     *
     * @throws FetchError<400, types.GetCollectionsSubscriptionPreferencesResponse400> 400
     */
    getCollectionsSubscriptionPreferences(metadata: types.GetCollectionsSubscriptionPreferencesMetadataParam): Promise<FetchResponse<200, types.GetCollectionsSubscriptionPreferencesResponse200>>;
    /**
     * Subscribe or update your collection's subscription preferences
     *
     * @throws FetchError<400, types.UpdateCollectionsSubscriptionPreferencesResponse400> 400
     */
    updateCollectionsSubscriptionPreferences(body: types.UpdateCollectionsSubscriptionPreferencesBodyParam, metadata: types.UpdateCollectionsSubscriptionPreferencesMetadataParam): Promise<FetchResponse<200, types.UpdateCollectionsSubscriptionPreferencesResponse200>>;
    /**
     * List Crowdsourced YARA Rules
     *
     * @throws FetchError<400, types.ListCrowdsourcedYaraRulesResponse400> 400
     */
    listCrowdsourcedYaraRules(metadata: types.ListCrowdsourcedYaraRulesMetadataParam): Promise<FetchResponse<200, types.ListCrowdsourcedYaraRulesResponse200>>;
    /**
     * Get a Crowdsourced YARA rule
     *
     * @throws FetchError<400, types.GetACrowdsourcedYaraRuleResponse400> 400
     */
    getACrowdsourcedYaraRule(metadata: types.GetACrowdsourcedYaraRuleMetadataParam): Promise<FetchResponse<200, types.GetACrowdsourcedYaraRuleResponse200>>;
    /**
     * Get objects related to a Crowdsourced YARA rule
     *
     * @throws FetchError<400, types.CrowdsourcedYaraRuleRelationshipEndpointResponse400> 400
     */
    crowdsourcedYaraRuleRelationshipEndpoint(metadata: types.CrowdsourcedYaraRuleRelationshipEndpointMetadataParam): Promise<FetchResponse<200, types.CrowdsourcedYaraRuleRelationshipEndpointResponse200>>;
    /**
     * Get objects descriptors related to a Crowdsourced YARA rule
     *
     * @throws FetchError<400, types.CrowdsourcedYaraRuleRelationshipDescriptorsEndpointResponse400> 400
     */
    crowdsourcedYaraRuleRelationshipDescriptorsEndpoint(metadata: types.CrowdsourcedYaraRuleRelationshipDescriptorsEndpointMetadataParam): Promise<FetchResponse<200, types.CrowdsourcedYaraRuleRelationshipDescriptorsEndpointResponse200>>;
    /**
     * Get objects from the IoC Stream
     *
     * @throws FetchError<400, types.GetObjectsFromTheIocStreamResponse400> 400
     */
    getObjectsFromTheIocStream(metadata: types.GetObjectsFromTheIocStreamMetadataParam): Promise<FetchResponse<200, types.GetObjectsFromTheIocStreamResponse200>>;
    /**
     * Delete notifications from the IoC Stream
     *
     * @throws FetchError<429, types.DeleteNotificationsFromTheIocStreamResponse429> 429
     */
    deleteNotificationsFromTheIocStream(metadata: types.DeleteNotificationsFromTheIocStreamMetadataParam): Promise<FetchResponse<200, types.DeleteNotificationsFromTheIocStreamResponse200>>;
    /**
     * Get an IoC Stream notification
     *
     * @throws FetchError<400, types.GetAnIocStreamNotificationResponse400> 400
     */
    getAnIocStreamNotification(metadata: types.GetAnIocStreamNotificationMetadataParam): Promise<FetchResponse<200, types.GetAnIocStreamNotificationResponse200>>;
    /**
     * Delete an IoC Stream notification
     *
     */
    deleteAnIocStreamNotification(metadata: types.DeleteAnIocStreamNotificationMetadataParam): Promise<FetchResponse<200, types.DeleteAnIocStreamNotificationResponse200>>;
    /**
     * Check if a user or group is a Livehunt ruleset editor
     *
     */
    checkUserHuntingRulesetEditor(metadata: types.CheckUserHuntingRulesetEditorMetadataParam): Promise<FetchResponse<200, types.CheckUserHuntingRulesetEditorResponse200>>;
    /**
     * Revoke Livehunt ruleset edit permission from a user or group
     *
     */
    deleteHuntingRulesetEditor(metadata: types.DeleteHuntingRulesetEditorMetadataParam): Promise<FetchResponse<200, types.DeleteHuntingRulesetEditorResponse200>>;
    /**
     * Search graphs
     *
     */
    graphs(metadata: types.GraphsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create a graph
     *
     */
    createGraphs(body: types.CreateGraphsBodyParam, metadata: types.CreateGraphsMetadataParam): Promise<FetchResponse<number, unknown>>;
    createGraphs(metadata: types.CreateGraphsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a graph object
     *
     */
    graphsInfo(metadata: types.GraphsInfoMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Update a graph object
     *
     */
    graphsUpdate(body: types.GraphsUpdateBodyParam, metadata: types.GraphsUpdateMetadataParam): Promise<FetchResponse<number, unknown>>;
    graphsUpdate(metadata: types.GraphsUpdateMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Delete a graph
     *
     */
    graphsDelete(metadata: types.GraphsDeleteMetadataParam): Promise<FetchResponse<200, types.GraphsDeleteResponse200>>;
    /**
     * Get comments on a graph
     *
     */
    getGraphComments(metadata: types.GetGraphCommentsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Add a comment to a graph
     *
     */
    postGraphsComments(body: types.PostGraphsCommentsBodyParam, metadata: types.PostGraphsCommentsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get objects related to a graph
     *
     */
    graphsRelationships(metadata: types.GraphsRelationshipsMetadataParam): Promise<FetchResponse<200, types.GraphsRelationshipsResponse200>>;
    /**
     * Get object descriptors related to a graph
     *
     */
    graphsRelationshipsIds(metadata: types.GraphsRelationshipsIdsMetadataParam): Promise<FetchResponse<200, types.GraphsRelationshipsIdsResponse200>>;
    /**
     * Get users and groups that can view a graph
     *
     */
    graphsViewers(metadata: types.GraphsViewersMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Grant users and groups permission to see a graph
     *
     */
    graphsAddViewer(metadata: types.GraphsAddViewerMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Check if a user or group can view a graph
     *
     */
    graphsCheckViewer(metadata: types.GraphsCheckViewerMetadataParam): Promise<FetchResponse<200, types.GraphsCheckViewerResponse200>>;
    /**
     * Revoke view permission from a user or group
     *
     */
    graphsDeleteViewer(metadata: types.GraphsDeleteViewerMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get users and groups that can edit a graph
     *
     */
    graphsEditors(metadata: types.GraphsEditorsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Grant users and groups permission to edit a graph
     *
     */
    graphsAddEditor(metadata: types.GraphsAddEditorMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Check if a user or group can edit a graph
     *
     */
    graphsCheckEditor(metadata: types.GraphsCheckEditorMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Revoke edit graph permissions from a user or group
     *
     */
    graphsDeleteEditor(metadata: types.GraphsDeleteEditorMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a minutely domain feed batch
     *
     * @throws FetchError<400, types.Feedsdomains2TimeResponse400> 400
     */
    feedsdomains2time(metadata: types.Feedsdomains2TimeMetadataParam): Promise<FetchResponse<200, types.Feedsdomains2TimeResponse200>>;
    /**
     * Get a minutely IP address feed batch
     *
     * @throws FetchError<400, types.GetFeedsIpAddressesResponse400> 400
     */
    getFeedsIpAddresses(metadata: types.GetFeedsIpAddressesMetadataParam): Promise<FetchResponse<200, types.GetFeedsIpAddressesResponse200>>;
    /**
     * Get a minutely URL feed batch
     *
     * @throws FetchError<400, types.FeedsUrlResponse400> 400
     */
    feedsUrl(metadata: types.FeedsUrlMetadataParam): Promise<FetchResponse<200, types.FeedsUrlResponse200>>;
    /**
     * Get object descriptors related to a group
     *
     */
    groupsRelationshipsIds(metadata: types.GroupsRelationshipsIdsMetadataParam): Promise<FetchResponse<200, types.GroupsRelationshipsIdsResponse200>>;
    /**
     * Get a widget rendering URL
     *
     * @throws FetchError<400, types.WidgeturlResponse400> 400
     * @throws FetchError<429, types.WidgeturlResponse429> 429
     */
    widgeturl(metadata: types.WidgeturlMetadataParam): Promise<FetchResponse<200, types.WidgeturlResponse200>>;
    /**
     * Get a list of MonitorItem objects by path or tag
     *
     */
    monitorItemsFilter(metadata: types.MonitorItemsFilterMetadataParam): Promise<FetchResponse<200, types.MonitorItemsFilterResponse200>>;
    /**
     * Upload a file or create a new folder
     *
     */
    monitorItemsCreate(body: types.MonitorItemsCreateBodyParam, metadata: types.MonitorItemsCreateMetadataParam): Promise<FetchResponse<200, types.MonitorItemsCreateResponse200>>;
    /**
     * Get a URL for uploading files larger than 32MB
     *
     */
    monitorItemsUploadUrl(metadata: types.MonitorItemsUploadUrlMetadataParam): Promise<FetchResponse<200, types.MonitorItemsUploadUrlResponse200>>;
    /**
     * Get attributes and metadata for a specific MonitorItem
     *
     */
    monitorItemsStat(metadata: types.MonitorItemsStatMetadataParam): Promise<FetchResponse<200, types.MonitorItemsStatResponse200>>;
    /**
     * Delete a VirusTotal Monitor file or folder
     *
     */
    monitorItemsDelete(metadata: types.MonitorItemsDeleteMetadataParam): Promise<FetchResponse<200, types.MonitorItemsDeleteResponse200>>;
    /**
     * Configure a given VirusTotal Monitor item (file or folder)
     *
     */
    monitorItemsConfig(body: types.MonitorItemsConfigBodyParam, metadata: types.MonitorItemsConfigMetadataParam): Promise<FetchResponse<200, types.MonitorItemsConfigResponse200>>;
    /**
     * Download a file in VirusTotal Monitor
     *
     */
    monitorItemsDownload(metadata: types.MonitorItemsDownloadMetadataParam): Promise<FetchResponse<200, types.MonitorItemsDownloadResponse200>>;
    /**
     * Get a URL for downloading a file in VirusTotal Monitor
     *
     */
    monitorItemsDownloadUrl(metadata: types.MonitorItemsDownloadUrlMetadataParam): Promise<FetchResponse<200, types.MonitorItemsDownloadUrlResponse200>>;
    /**
     * Get the latest file analyses
     *
     */
    monitorItemsAnalyses(metadata: types.MonitorItemsAnalysesMetadataParam): Promise<FetchResponse<200, types.MonitorItemsAnalysesResponse200>>;
    /**
     * Get user owning the MonitorItem object
     *
     */
    monitorItemsOwner(metadata: types.MonitorItemsOwnerMetadataParam): Promise<FetchResponse<200, types.MonitorItemsOwnerResponse200>>;
    /**
     * Retrieve partner's comments on a file
     *
     */
    monitorItemComments(metadata: types.MonitorItemCommentsMetadataParam): Promise<FetchResponse<200, types.MonitorItemCommentsResponse200>>;
    /**
     * Retrieve statistics about analyses performed on your software collection
     *
     */
    monitorStatistics(metadata: types.MonitorStatisticsMetadataParam): Promise<FetchResponse<200, types.MonitorStatisticsResponse200>>;
    /**
     * Retrieve historical events about your software collection
     *
     */
    events(metadata: types.EventsMetadataParam): Promise<FetchResponse<200, types.EventsResponse200>>;
    /**
     * Get a list of MonitorHashes detected by an engine
     *
     */
    monitorpartnerHashes(metadata: types.MonitorpartnerHashesMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a list of analyses for a file
     *
     */
    monitorpartnerHashesAnalyses(metadata: types.MonitorpartnerHashesAnalysesMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a list of items with a given sha256 hash
     *
     */
    monitorpartnerHashesItems(metadata: types.MonitorpartnerHashesItemsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create a comment and if necessary confirm detection over a hash
     *
     * @summary Create a comment over a hash
     */
    monitorpartnerHashesComments(body: types.MonitorpartnerHashesCommentsBodyParam, metadata: types.MonitorpartnerHashesCommentsMetadataParam): Promise<FetchResponse<number, unknown>>;
    monitorpartnerHashesComments(metadata: types.MonitorpartnerHashesCommentsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get comments on a sha256 hash
     *
     */
    getSha256HashComments(metadata: types.GetSha256HashCommentsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create a comment and if necessary confirm detection over a hash
     *
     * @summary Add a comment on a sha256 hash
     */
    monitorpartnerCommentsPatch(body: types.MonitorpartnerCommentsPatchBodyParam, metadata: types.MonitorpartnerCommentsPatchMetadataParam): Promise<FetchResponse<number, unknown>>;
    monitorpartnerCommentsPatch(metadata: types.MonitorpartnerCommentsPatchMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Remove a comment and reset confirmed detection for a hash.
     *
     * @summary Remove a comment detection for a hash.
     */
    monitorpartnerCommentsDelete(metadata: types.MonitorpartnerCommentsDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Download a file with a given sha256 hash
     *
     */
    monitorpartnerFilesDownload(metadata: types.MonitorpartnerFilesDownloadMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Retrieve a download url for a file with a given sha256 hash
     *
     */
    monitorpartnerFilesDownloadUrl(metadata: types.MonitorpartnerFilesDownloadUrlMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Download a daily detection bundle directly
     *
     */
    monitorpartnerDetectionsbundleDownload(metadata: types.MonitorpartnerDetectionsbundleDownloadMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a daily detection bundle download URL
     *
     */
    monitorpartnerDetectionsbundleDownloadUrl(metadata: types.MonitorpartnerDetectionsbundleDownloadUrlMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a list of MonitorHashes detected by an engine
     *
     */
    monitorpartnerStatistics(metadata: types.MonitorpartnerStatisticsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Lists all your Alerts Assets
     *
     */
    assets(metadata?: types.AssetsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create a new Alerts Asset
     *
     */
    watchlistsAssetsCreate(body?: types.WatchlistsAssetsCreateBodyParam, metadata?: types.WatchlistsAssetsCreateMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get an Alerts Asset
     *
     */
    assetsid(metadata: types.AssetsidMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Deletes the Alerts Asset
     *
     */
    watchlistsAssetsidDelete(metadata: types.WatchlistsAssetsidDeleteMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Lists Alerts Notifications
     *
     */
    notifications(metadata?: types.NotificationsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get a single Alerts Notification
     *
     */
    notificationsid(metadata: types.NotificationsidMetadataParam): Promise<FetchResponse<number, unknown>>;
}
declare const createSDK: SDK;
export = createSDK;
